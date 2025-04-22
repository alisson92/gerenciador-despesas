import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Button, Box, Typography, Paper, Table, TableHead, TableBody,
  TableCell, TableRow, Select, InputLabel, FormControl, MenuItem
} from '@mui/material';
import {
  PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar,
  XAxis, YAxis, Tooltip, Legend
} from 'recharts';

const CORES = [
  "#0088FE", "#FF8042", "#00C49F",
  "#FFBB28", "#d32f2f", "#9C27B0"
];

function currentYear() {
  return new Date().getFullYear();
}
const anos = Array.from({ length: 6 }, (_, k) => currentYear() - k).reverse();
const meses = [
  { num: '', nome: 'Todos' },
  { num: '01', nome: 'Janeiro' }, { num: '02', nome: 'Fevereiro' }, { num: '03', nome: 'Março' },
  { num: '04', nome: 'Abril' }, { num: '05', nome: 'Maio' }, { num: '06', nome: 'Junho' },
  { num: '07', nome: 'Julho' }, { num: '08', nome: 'Agosto' }, { num: '09', nome: 'Setembro' },
  { num: '10', nome: 'Outubro' }, { num: '11', nome: 'Novembro' }, { num: '12', nome: 'Dezembro' },
];
const CATEGORIAS = [
  { slug: '', label: 'Todas' },
  { slug: 'alimentacao', label: 'Alimentação' },
  { slug: 'transporte', label: 'Transporte' },
  { slug: 'lazer', label: 'Lazer' },
  { slug: 'saude', label: 'Saúde' },
  { slug: 'outros', label: 'Outros' }
];
const categoriaLabels = Object.fromEntries(CATEGORIAS.map(cat => [cat.slug, cat.label]));

const Relatorios = () => {
  const token = localStorage.getItem('token');
  const [ano, setAno] = useState('');
  const [mes, setMes] = useState('');
  const [categoria, setCategoria] = useState('');
  const [dados, setDados] = useState([]);
  const [detalhes, setDetalhes] = useState([]);
  const [erroAlert, setErroAlert] = useState('');

  const handleAnoChange = (e) => {
    setAno(e.target.value);
    setMes('');
    setCategoria('');
    setDados([]);
    setDetalhes([]);
  };

  const handleMesChange = (e) => {
    setMes(e.target.value);
    setCategoria('');
    setDados([]);
    setDetalhes([]);
  };

  const validarCampos = () => {
    if (!ano) {
      setErroAlert('Por favor, selecione o Ano.');
      return false;
    }
    if (mes && !categoria) {
      setErroAlert('Por favor, selecione a Categoria.');
      return false;
    }
    setErroAlert('');
    return true;
  };

  // Busca despesas detalhadas (descrição, valor, data) para mês+categoria+ano
  const buscarDetalhamento = async () => {
    if (!ano || !mes || !categoria) return;
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/relatorio/detalhe?ano=${ano}&mes=${mes}&categoria=${categoria}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDetalhes(resp.data || []);
    } catch {
      setDetalhes([]);
    }
  };

  const buscarRelatorio = async () => {
    if (!validarCampos()) return;

    let dataInicial, dataFinal;
    if (mes) {
      dataInicial = `${ano}-${mes}-01`;
      dataFinal = new Date(ano, parseInt(mes, 10), 0).toISOString().split('T')[0];
    } else {
      dataInicial = `${ano}-01-01`;
      dataFinal = `${ano}-12-31`;
    }

    const agrupar = mes ? 'categoria' : 'mes';
    const paramsObj = { dataInicial, dataFinal, agrupar };
    if (mes && categoria) paramsObj.categoria = categoria;

    const params = new URLSearchParams(paramsObj).toString();
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/relatorio/agrupado?${params}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDados(resp.data);
      if (mes && categoria) {
        buscarDetalhamento();
      } else {
        setDetalhes([]);
      }
    } catch (error) {
      setDados([]);
      setErroAlert('Erro ao buscar relatório!');
      setDetalhes([]);
    }
  };

  const exportFile = async (tipo) => {
    if (!validarCampos()) return;
    let dataInicial, dataFinal;
    if (mes) {
      dataInicial = `${ano}-${mes}-01`;
      dataFinal = new Date(ano, parseInt(mes, 10), 0).toISOString().split('T')[0];
    } else {
      dataInicial = `${ano}-01-01`;
      dataFinal = `${ano}-12-31`;
    }
    const agrupar = mes ? 'categoria' : 'mes';
    const paramsObj = { dataInicial, dataFinal, agrupar };
    if (mes && categoria) paramsObj.categoria = categoria;
    const params = new URLSearchParams(paramsObj).toString();

    const endpoint = tipo === 'excel'
      ? `/relatorio/exportar/excel?${params}`
      : `/relatorio/exportar/pdf?${params}`;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${endpoint}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response.ok) throw new Error();
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = tipo === 'excel' ? 'relatorio.xlsx' : 'relatorio.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      setErroAlert('Falha ao exportar relatório!');
    }
  };

  let dataGraf = [];
  let isCategoria = Boolean(mes);
  if (dados.length > 0) {
    dataGraf = isCategoria
      ? dados.map(x => ({
        name: categoriaLabels[x.categoria] || x.categoria,
        value: Number(x.total)
      }))
      : dados.map(x => ({
        name: new Date(x.mes).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
        value: Number(x.total)
      }));
  }

  // Totalizador detalhado (para footer da tabela unificada)
  const totalDetalhes = detalhes.reduce((soma, item) => soma + Number(item.valor), 0);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Relatórios</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Box gap={2} display="flex" flexWrap="wrap">
          <FormControl>
            <InputLabel htmlFor="ano-sel">Ano</InputLabel>
            <Select
              id="ano-sel"
              value={ano}
              label="Ano"
              onChange={handleAnoChange}
              sx={{ minWidth: 100 }}
            >
              <MenuItem value=''>Selecione</MenuItem>
              {anos.map(y => (
                <MenuItem key={y} value={String(y)}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl disabled={!ano}>
            <InputLabel htmlFor="mes-sel">Mês</InputLabel>
            <Select
              id="mes-sel"
              value={mes}
              label="Mês"
              onChange={handleMesChange}
              sx={{ minWidth: 120 }}
            >
              <MenuItem value=''>Todos</MenuItem>
              {meses.filter(m => m.num).map(m => (
                <MenuItem key={m.num} value={m.num}>{m.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl disabled={!ano || !mes}>
            <InputLabel htmlFor="categoria-sel">Categoria</InputLabel>
            <Select
              id="categoria-sel"
              value={categoria}
              label="Categoria"
              onChange={e => setCategoria(e.target.value)}
              sx={{ minWidth: 130 }}
            >
              <MenuItem value=''>Todas</MenuItem>
              {CATEGORIAS.filter(cat => cat.slug).map(cat => (
                <MenuItem value={cat.slug} key={cat.slug}>{cat.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" gap={2} mt={2}>
          <Button variant="contained" color="primary" onClick={buscarRelatorio}>Buscar</Button>
          <Button variant="contained" color="success" onClick={() => exportFile('excel')}>Exportar Excel</Button>
          <Button variant="contained" color="warning" onClick={() => exportFile('pdf')}>Exportar PDF</Button>
        </Box>
        {erroAlert &&
          <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
            {erroAlert}
          </Typography>
        }
      </Paper>

      {/* Gráfico */}
      {dataGraf.length > 0 && (
        <Paper sx={{ p: 2, mb: 2, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            {isCategoria ? 'Distribuição por Categoria' : 'Evolução Mensal'}
          </Typography>
          <Box height={300}>
            {isCategoria ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={dataGraf} dataKey="value" nameKey="name" label>
                    {dataGraf.map((entry, idx) => (
                      <Cell key={entry.name} fill={CORES[idx % CORES.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataGraf}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0088FE" />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Box>
        </Paper>
      )}

      {/* Tabela única: detalhamento (categoria + descrição + valor + data) */}
      {detalhes.length > 0 && (
        <Paper sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Detalhamento dos Gastos
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Categoria</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detalhes.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>{categoriaLabels[item.categoria] || item.categoria}</TableCell>
                  <TableCell>{item.descricao}</TableCell>
                  <TableCell>
                    {Number(item.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </TableCell>
                  <TableCell>
                    {new Date(item.data).toLocaleDateString('pt-BR')}
                  </TableCell>
                </TableRow>
              ))}
              {/* Totais no rodapé */}
              <TableRow>
                <TableCell colSpan={2}><b>Total</b></TableCell>
                <TableCell>
                  <b>
                    {totalDetalhes.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </b>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default Relatorios;

import React, { useState } from 'react';
import axios from 'axios';
import {
  Container, Button, TextField, Box, MenuItem, Typography, Paper,
  Table, TableHead, TableBody, TableCell, TableRow, Select, InputLabel, FormControl
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const CORES = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#d32f2f", "#9C27B0"];

function currentYear() {
  return new Date().getFullYear();
}

const anos = Array.from({ length: 6 }, (_, k) => currentYear() - k).reverse();
const meses = [
  { num: '', nome: 'Todos' },
  { num: '01', nome: 'Janeiro' },
  { num: '02', nome: 'Fevereiro' },
  { num: '03', nome: 'Março' },
  { num: '04', nome: 'Abril' },
  { num: '05', nome: 'Maio' },
  { num: '06', nome: 'Junho' },
  { num: '07', nome: 'Julho' },
  { num: '08', nome: 'Agosto' },
  { num: '09', nome: 'Setembro' },
  { num: '10', nome: 'Outubro' },
  { num: '11', nome: 'Novembro' },
  { num: '12', nome: 'Dezembro' },
];

const Relatorios = () => {
  const token = localStorage.getItem('token');
  const [ano, setAno] = useState(String(currentYear()));
  const [mes, setMes] = useState('');
  const [categoria, setCategoria] = useState('');
  const [dados, setDados] = useState([]);

  const buscarRelatorio = async () => {
    let dataInicial = `${ano}-${mes || '01'}-01`;
    let dataFinal = `${ano}-${mes || '12'}-31`;
    // Se mês está vazio (Todos), pegar todo o ano!
    if (!mes) {
      dataInicial = `${ano}-01-01`;
      dataFinal = `${ano}-12-31`;
    }
    // Filtros para API (agrupar por mês por padrão, mas pode ajustar para categoria caso deseje)
    const params = new URLSearchParams({
      dataInicial,
      dataFinal,
      categoria: categoria || undefined,
      agrupar: mes ? 'categoria' : 'mes'
    }).toString();
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/relatorio/agrupado?${params}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDados(resp.data);
    } catch (error) {
      setDados([]);
      alert('Erro ao buscar relatório!');
    }
  };

  // Exportação segura com token: faz fetch, converte blob e dispara download
  const exportFile = async (tipo) => {
    let dataInicial = `${ano}-${mes || '01'}-01`;
    let dataFinal = `${ano}-${mes || '12'}-31`;
    if (!mes) {
      dataInicial = `${ano}-01-01`;
      dataFinal = `${ano}-12-31`;
    }
    const params = new URLSearchParams({
      dataInicial,
      dataFinal,
      categoria: categoria || undefined,
      // agrupar: mes ? 'categoria' : 'mes' // pode ser omitido
    }).toString();
    const endpoint =
      tipo === 'excel'
        ? `/relatorio/exportar/excel?${params}`
        : `/relatorio/exportar/pdf?${params}`;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${endpoint}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (!response.ok) throw new Error('Falha ao exportar relatório.');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = tipo === 'excel' ? 'relatorio.xlsx' : 'relatorio.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch {
      alert('Falha ao exportar relatório!');
    }
  };

  // Dados para gráfico
  let dataGraf = [];
  let isCategoria = Boolean(mes);
  if (dados.length > 0) {
    dataGraf = isCategoria
      ? dados.map(x => ({ name: x.categoria, value: Number(x.total) }))
      : dados.map(x => ({
          name: new Date(x.mes).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' }),
          value: Number(x.total)
        }));
  }

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
              onChange={e => setAno(e.target.value)}
              sx={{ minWidth: 100 }}
            >
              {anos.map(y => (
                <MenuItem key={y} value={String(y)}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="mes-sel">Mês</InputLabel>
            <Select
              id="mes-sel"
              value={mes}
              label="Mês"
              onChange={e => setMes(e.target.value)}
              sx={{ minWidth: 120 }}
            >
              {meses.map(m => (
                <MenuItem key={m.num} value={m.num}>{m.nome}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="categoria-sel">Categoria</InputLabel>
            <Select
              id="categoria-sel"
              value={categoria}
              label="Categoria"
              onChange={e => setCategoria(e.target.value)}
              sx={{ minWidth: 130 }}
            >
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="alimentacao">Alimentação</MenuItem>
              <MenuItem value="transporte">Transporte</MenuItem>
              <MenuItem value="lazer">Lazer</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box display="flex" gap={2} mt={2}>
          <Button variant="contained" color="primary" onClick={buscarRelatorio}>Buscar</Button>
          <Button variant="contained" color="success" onClick={() => exportFile('excel')}>Exportar Excel</Button>
          <Button variant="contained" color="warning" onClick={() => exportFile('pdf')}>Exportar PDF</Button>
        </Box>
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
                  <Tooltip/>
                  <Legend/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dataGraf}>
                  <XAxis dataKey="name"/>
                  <YAxis/>
                  <Tooltip/>
                  <Bar dataKey="value" fill="#0088FE" />
                  <Legend/>
                </BarChart>
              </ResponsiveContainer>
            )}
          </Box>
        </Paper>
      )}

      {/* Tabela */}
      {dados.length > 0 && (
        <Paper sx={{ p: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                {Object.keys(dados[0]).map(key => (
                  <TableCell key={key}>
                    {key === 'mes'
                      ? 'Mês'
                      : key === 'categoria'
                        ? 'Categoria'
                        : key === 'total'
                          ? 'Total'
                          : key}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dados.map((item, idx) => (
                <TableRow key={idx}>
                  {Object.entries(item).map(([key, val]) => (
                    <TableCell key={key}>
                      {key === 'mes'
                        ? new Date(val).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })
                        : key === 'total'
                          ? Number(val).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                          : val
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {!dados.length && (
        <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
          Nenhum dado encontrado para os filtros selecionados.
        </Typography>
      )}
    </Container>
  );
};

export default Relatorios;

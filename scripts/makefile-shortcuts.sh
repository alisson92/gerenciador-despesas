#!/bin/bash

# Cores ANSI
YELLOW='\033[1;33m'
GREEN='\033[1;32m'
CYAN='\033[1;36m'
RESET='\033[0m'
BOLD='\033[1m'

echo -e "${BOLD}${CYAN}#### Como usar o Makefile ####${RESET}\n"

echo -e "${YELLOW}-------------------------------------------------------------------------------------------${RESET}"
echo -e "${BOLD}  Ação                                             | Comando${RESET}"
echo -e "${YELLOW}-------------------------------------------------------------------------------------------${RESET}"
echo -e "Subir ambiente de desenvolvimento                 | ${GREEN}make up${RESET}"
echo -e "Derrubar ambiente de desenvolvimento              | ${GREEN}make down${RESET}"
echo -e "Ver logs do ambiente de desenvolvimento           | ${GREEN}make logs${RESET}"
echo -e "Fazer backup do banco de desenvolvimento          | ${GREEN}make backup${RESET}"
echo -e "Restaurar backup do banco de desenvolvimento      | ${GREEN}make restore${RESET}"
echo -e ""
echo -e "Subir ambiente de produção                        | ${GREEN}make up-prod${RESET}"
echo -e "Derrubar ambiente de produção                     | ${GREEN}make down-prod${RESET}"
echo -e "Ver logs do ambiente de produção                  | ${GREEN}make logs-prod${RESET}"
echo -e "Fazer backup do banco de produção                 | ${GREEN}make backup-prod${RESET}"
echo -e "Restaurar backup do banco de produção             | ${GREEN}make restore-prod${RESET}"
echo -e ""
echo -e "Limpeza geral do Docker                           | ${GREEN}make prune${RESET}"
echo -e "${YELLOW}-------------------------------------------------------------------------------------------${RESET}"


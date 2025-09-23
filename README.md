# Instruções para instalação e teste do conector personalizado

Todos os trechos de código a seguir foram executados em um **Debian 12** utilizando o interpretador de comandos **Bash**.

## Depêndencias

- [Git](https://git-scm.com/downloads)
- [Docker Desktop](https://docs.docker.com/get-started/get-docker/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Node.js e npm](https://nodejs.org/en/download)

## Configuração do PostgreSQL para instância local do n8n

1. Confirir se o PostgreSQL está executando

```
sudo systemctl status postgresql.service
```

2. Conctar ao servido PostgreSQL

```
sudo -u postgres psql
```

3. Criar nova base de dados e usuário

```sql
CREATE DATABASE <nome_base_de_dados>;
CREATE USER <nome_usuario> WITH ENCRYPTED PASSWORD '<senha_usuario>';
GRANT ALL PRIVILEGES ON DATABASE <nome_base_de_dados> TO <nome_usuario>;
```


# Instruções para instalação e teste do conector personalizado

Todos os trechos de código a seguir foram executados em um **Debian 12** utilizando o interpretador de comandos **Bash**.

## Depêndencias

- [Git](https://git-scm.com/downloads)
- [Docker Desktop](https://docs.docker.com/get-started/get-docker/)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Node.js e npm](https://nodejs.org/en/download)

## Execução do conector

### Configuração do PostgreSQL para instância local do n8n

1. Confirir se o PostgreSQL está executando

```console
sudo systemctl status postgresql.service
```

2. Conctar ao servido PostgreSQL

```console
sudo -u postgres psql
```

3. Criar nova base de dados e usuário

```sql
CREATE DATABASE <nome_base_de_dados>;
CREATE USER <nome_usuario> WITH ENCRYPTED PASSWORD '<senha_usuario>';
GRANT ALL PRIVILEGES ON DATABASE <nome_base_de_dados> TO <nome_usuario>;
\q
```

### Configuração das variáveis de ambiente

1. Clonar repositório

```console
git clone https://github.com/x86-carlos/n8n-random-node.git
```

2. Criar arquivo .env na raiz do projeto e abrir com seu editor de preferência

```console
cd n8n-random-node
touch .env
```
3. Preencha o arquivo .env com as variáveis de ambiente

```console
# .env file
N8N_TIMEZONE=<seu_fuso_horario>

POSTGRES_DB=<base_de_dados_postgres>
POSTGRES_USER=<usuario_postgres>
POSTGRES_PASSWORD=<senha_usuario_postgres>
POSTGRES_HOST=n8n-postgres
POSTGRES_PORT=<porta_postgres>
POSTGRES_SCHEMA=<schema_postgres>

N8N_PORT=5678
```
**OBS:** Para encontrar o fuso horário do sistema utilize o comando ``timedatectl``

**OBS 2**: A porta padrão do PostgreSQL é a **5432** e o *schema* padrão é **public**. Contudo para encontrar essas informações utilize os seguintes comandos: 

```console
# Conectar ao postgres
sudo -u postgres psql

# Descobrir a porta
\conninfo

# Descobrir o schema
\dn
```
### Configurando conector personalizado

1. Navegue até a raiz do código do conector

```console
cd n8n-random-node-code
```
2. Instale as dependências

```console
npm install
```
3. Execute o *script* de *build* do conector

```console
npm run build
```
### Executar instancia local e testar nó

1. Navegue até a o diretório que contem o arquivo ``docker-compose.yml``

```console
cd ../
```
2. Inicie o serviço ``docker-desktop.service``

```console
systemctl --user docker-desktop.service
```

3. Inicie o container

```console
docker compose up
```
4. Abra um navegador e entre no n8n em http://localhost:5678
5. Ao abrir o n8n pela primeira vez será pedido para que se crie uma nova conta
6. Após criar uma conta, na página inicial do n8n, aperte no botão para criar um novo *workflow*.
7. Na página do novo *workflow* selecione o ícone de *+* e busque pelo conector *Random*.
8. Crie uma credencial vazia, pois a o endpoint da API não exige uma chave
9. Preencha os *inputs* do conector (ou use os *defaults*) e pressione *Execute Step* para executar o conector e sortear um número aleatório.

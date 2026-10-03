# API-PRODUTOS

API REST simples para cadastro e consulta de produtos, feita com **Node.js**, **Express** e **MongoDB** (via **Mongoose**).

## Tecnologias

- Node.js
- Express 5
- MongoDB + Mongoose
- dotenv (variáveis de ambiente)
- nodemon (reload automático em desenvolvimento)

## Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (recomendado versão 18 ou superior)
- Uma instância do MongoDB acessível — pode ser:
  - um banco no [MongoDB Atlas](https://www.mongodb.com/atlas) (gratuito), ou
  - um MongoDB rodando localmente

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd API-PRODUTOS
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto, usando o `.env.example` como base:

```bash
cp .env.example .env
```

Depois, edite o `.env` e preencha a string de conexão do MongoDB:

```env
DB_CONNECTION_STRING=sua_string_de_conexao_do_mongodb
PORT=8000
```

> ⚠️ O arquivo `.env` **nunca** deve ser commitado (ele já está no `.gitignore`). Cada pessoa que for rodar o projeto precisa criar o seu próprio, com suas próprias credenciais.

### 4. Rode o servidor

```bash
npm run dev
```

Se tudo estiver certo, você verá no terminal:

```
servidor escutando!
Conexão realizada com sucesso!
```

A API estará disponível em `http://localhost:8000` (ou na porta definida em `PORT`).

## Endpoints

| Método | Rota              | Descrição                                      |
|--------|-------------------|-------------------------------------------------|
| GET    | `/`               | Mensagem de status da API                       |
| GET    | `/produtos`       | Lista todos os produtos                         |
| GET    | `/produtos?nome=` | Filtra produtos pelo nome                       |
| GET    | `/produtos/:id`   | Busca um produto pelo ID                        |
| POST   | `/produtos`       | Cria um novo produto                            |
| PUT    | `/produtos/:id`   | Atualiza um produto existente                   |
| DELETE | `/produtos/:id`   | Remove um produto                               |

### Exemplo de corpo para criar/atualizar um produto (POST/PUT)

```json
{
  "nome": "Caneta",
  "preco": 2.5,
  "quantidade": 100
}
```

### Códigos de status usados

- `200` — sucesso (leitura, atualização, remoção)
- `201` — produto criado com sucesso
- `400` — requisição inválida (ID mal formatado ou dados inválidos)
- `404` — produto não encontrado
- `500` — erro interno do servidor

## Estrutura do projeto

```
API-PRODUTOS/
├── server.js                        # ponto de entrada, inicia o servidor
├── src/
│   ├── app.js                       # configuração do Express e conexão com o banco
│   ├── config/
│   │   └── dbConnect.js             # conexão com o MongoDB
│   ├── controllers/
│   │   └── produtosController.js    # regras de negócio das rotas de produtos
│   ├── models/
│   │   └── Produto.js               # schema do produto (Mongoose)
│   └── routes/
│       ├── index.js                 # ponto central das rotas
│       └── produtosRoutes.js        # rotas específicas de produtos
├── .env.example                     # modelo das variáveis de ambiente
└── package.json
```

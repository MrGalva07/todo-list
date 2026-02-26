# 📝 Todo List App

Aplicação full-stack de lista de tarefas (Todo List) desenvolvida com **.NET 10 + C#** no backend, **React + TypeScript** no frontend, e **PostgreSQL** como banco de dados. O projeto segue os princípios da Clean Architecture e está totalmente containerizado com Docker.

🔗 **Aplicação em Produção:** [https://todo-list07.vercel.app](https://todo-list07.vercel.app)

---

## 🚀 Tecnologias Utilizadas

### Backend
- **.NET 10** com C# - Framework principal para construção da API
- **Entity Framework Core** - ORM para PostgreSQL
- **Clean Architecture** - Separação em camadas (Core, Infrastructure, API)
- **PostgreSQL** - Banco de dados relacional
- **Scalar** - Documentação interativa da API (substituto do Swagger UI)

### Frontend
- **React 18** com **TypeScript** - Biblioteca para construção da interface
- **Styled Components** - Estilização com tema escuro e laranja neon
- **React Hot Toast** - Notificações elegantes e customizáveis
- **Axios** - Cliente HTTP para consumo da API
- **React Icons** - Ícones modernos (Feather Icons)

### DevOps
- **Docker** - Containerização da aplicação
- **Docker Compose** - Orquestração dos containers (PostgreSQL + Backend + Frontend)
- **Git** - Versionamento de código com commits semânticos

### Deploy
- **Vercel** - Frontend React com integração contínua
- **Render** - Backend .NET com Docker
- **Neon** - Banco de dados PostgreSQL serverless (integrado ao Vercel)

---

## 📋 Funcionalidades

- ✅ **Criar novas tarefas** com título e descrição
- ✅ **Listar todas as tarefas** ordenadas por data de criação
- ✅ **Marcar tarefas como concluídas** com toggle visual
- ✅ **Editar tarefas existentes** (título e descrição)
- ✅ **Excluir tarefas** com confirmação
- ✅ **Filtrar tarefas** (Todas / Ativas / Concluídas)
- ✅ **Contadores dinâmicos** (total, ativas, concluídas)
- ✅ **Validações no frontend** (título mínimo de 3 caracteres)
- ✅ **Design responsivo** com tema escuro e laranja neon
- ✅ **Notificações toast** para feedback das ações (sucesso/erro)
- ✅ **Animações suaves** em todos os elementos interativos

---

## 🏗️ Arquitetura do Projeto

### Backend (Clean Architecture)
O backend segue os princípios da **Clean Architecture**, garantindo separação de responsabilidades e facilidade de manutenção:
backend/
├── TodoList.API/ # Camada de Apresentação
│ ├── Controllers/ # Endpoints da API
│ │ └── TodoController.cs # CRUD de tarefas
│ ├── Program.cs # Configurações da aplicação
│ └── appsettings.json # Configurações (CORS, conexão)
│
├── TodoList.Core/ # Camada de Domínio
│ ├── Entities/ # Entidades do negócio
│ │ └── TodoItem.cs # Entidade Tarefa
│ ├── Interfaces/ # Contratos
│ │ └── ITodoRepository.cs # Interface do repositório
│ └── DTOs/ # Objetos de transferência
│ └── TodoDto.cs # CreateDto, UpdateDto, ResponseDto
│
└── TodoList.Infrastructure/ # Camada de Infraestrutura
├── Data/ # Contexto do banco
│ └── AppDbContext.cs # Configuração do EF Core
└── Repositories/ # Implementações concretas
└── TodoRepository.cs # Repositório com PostgreSQL

text

### Frontend (React)
O frontend está organizado de forma modular e escalável:
frontend/
├── public/ # Arquivos públicos
│ └── index.html # Template HTML
│
└── src/
├── components/ # Componentes React
│ └── TodoList.tsx # Componente principal
│
├── services/ # Serviços
│ └── api.ts # Configuração do Axios
│
├── styles/ # Estilos globais
│ ├── theme.ts # Tema (cores, espaçamentos)
│ ├── global.ts # Estilos globais
│ └── mixins.ts # Mixins reutilizáveis
│
├── types/ # Tipagens TypeScript
│ └── Todo.ts # Interfaces das tarefas
│
├── App.tsx # Componente raiz
└── index.tsx # Ponto de entrada

text

---

## 🚦 Como Executar Localmente

### Pré-requisitos
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js 20+](https://nodejs.org)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Git](https://git-scm.com)

### Passo a passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/MrGalva07/todo-list.git
   cd todo-list
Execute com Docker Compose (recomendado)

bash
docker-compose up --build
Acesse a aplicação

Frontend: http://localhost:3000

Backend API: http://localhost:5000/api/todo

Documentação da API: http://localhost:5000/scalar

Executar sem Docker (desenvolvimento)
Terminal 1 - Backend:

bash
cd backend
dotnet restore
dotnet run --project TodoList.API
O backend estará disponível em http://localhost:5180

Terminal 2 - Frontend:

bash
cd frontend
npm install
npm start
O frontend estará disponível em http://localhost:3000

🌐 Deploy em Produção
A aplicação está disponível publicamente nos seguintes endereços:

Serviço	URL	Tecnologia
Frontend	https://todo-list07.vercel.app	Vercel
Backend API	https://todo-list-dc5j.onrender.com	Render
Documentação API	https://todo-list-dc5j.onrender.com/scalar	Scalar
Banco de Dados	Gerenciado pela Neon	PostgreSQL
Configuração do Deploy
Vercel (Frontend)

Variável de ambiente: REACT_APP_API_URL = https://todo-list-dc5j.onrender.com/api

Build command: npm run build

Output directory: build

Render (Backend)

Connection string: ConnectionStrings__DefaultConnection (Neon)

Dockerfile na raiz do repositório

Porta exposta: 80

Neon (Banco de Dados)

Integrado via Vercel Storage

Região: São Paulo (gru1)

Plano gratuito com 0.5GB de armazenamento

📸 Screenshots
Aguardando screenshots da aplicação em funcionamento

Tela	Descrição
Lista de tarefas	Visualização principal com filtros
Criação de tarefa	Formulário com validações
Tarefas concluídas	Visualização com filtro aplicado
🛠️ Melhorias Futuras
Autenticação com JWT e login social

Testes unitários com xUnit (backend) e Jest (frontend)

Testes de integração da API

Paginação na lista de tarefas

Acessibilidade (ARIA labels e navegação por teclado)

PWA (Progressive Web App)

CI/CD com GitHub Actions

Docker multi-stage para produção

Variáveis de ambiente para diferentes ambientes

🐳 Comandos Docker Úteis
bash
# Construir e iniciar todos os serviços
docker-compose up --build

# Iniciar em background
docker-compose up -d

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (apaga o banco)
docker-compose down -v

# Ver logs de um serviço específico
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres

# Executar comandos dentro do container
docker exec -it todo-backend bash
📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

👨‍💻 Autor
Lucas Galvão
GitHub
LinkedIn (adicione se tiver)

🙏 Agradecimentos
Documentação oficial do .NET, React e Docker

Comunidade open source pelas ferramentas e bibliotecas

Render, Vercel e Neon pelos planos gratuitos

A todos que contribuíram com feedback e sugestões

📊 Status do Projeto
https://img.shields.io/badge/status-produ%25C3%25A7%25C3%25A3o-green
https://img.shields.io/badge/version-1.0.0-blue
https://img.shields.io/badge/license-MIT-orange

text

## 🚀 **COMO ADICIONAR AO REPOSITÓRIO:**

```bash
# Criar o arquivo README.md
# Cole todo o conteúdo acima

# Adicionar ao git
git add README.md
git commit -m "docs: add comprehensive README with project documentation"
git push

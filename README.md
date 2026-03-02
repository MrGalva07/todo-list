# 📝 Todo List App

Aplicação full-stack de lista de tarefas (Todo List) desenvolvida com **.NET 10 + C#** no backend, 
**React + TypeScript** no frontend, e **PostgreSQL** como banco de dados. O projeto segue os 
princípios da Clean Architecture e está totalmente containerizado com Docker.

🔗 **Aplicação em Produção:** [https://todo-list07.vercel.app]


## ⚡ Observação sobre o Primeiro Acesso
O backend está hospedado no Render utilizando o plano gratuito, que desativa o serviço após 15 minutos de inatividade para otimização de recursos. 
Comportamento esperado:

No primeiro acesso do dia ou após um período sem uso, o servidor pode levar de 20 a 30 segundos para "acordar"

Durante este breve momento, a interface exibe uma mensagem amigável de "Iniciando aplicação..." com um spinner de carregamento

Após a inicialização, todas as funcionalidades operam com resposta imediata

Esta implementação foi cuidadosamente projetada para garantir uma experiência transparente, informando o usuário sobre o processo ✅
---

## 🚀 Tecnologias Utilizadas

### Backend
- **.NET 10** com C#
- **Entity Framework Core** - ORM para PostgreSQL
- **Clean Architecture** - Separação em camadas (Core, Infrastructure, API)
- **PostgreSQL** - Banco de dados relacional
- **Scalar** - Documentação interativa da API

### Frontend
- **React 18** com **TypeScript**
- **Styled Components** - Estilização com tema escuro e laranja neon
- **React Hot Toast** - Notificações elegantes
- **Axios** - Cliente HTTP
- **React Icons** - Ícones modernos

### DevOps
- **Docker** - Containerização da aplicação
- **Docker Compose** - Orquestração dos containers
- **Git** - Versionamento de código

### Deploy
- **Vercel** - Frontend React
- **Render** - Backend .NET
- **Neon** - Banco de dados PostgreSQL serverless

---

## 📋 Funcionalidades

- ✅ Criar novas tarefas com título e descrição
- ✅ Listar todas as tarefas
- ✅ Marcar tarefas como concluídas
- ✅ Editar tarefas existentes
- ✅ Excluir tarefas
- ✅ Filtrar tarefas (Todas / Ativas / Concluídas)
- ✅ Contadores de tarefas (total, ativas, concluídas)
- ✅ Validações no frontend
- ✅ Design responsivo com tema escuro e laranja neon
- ✅ Notificações toast para feedback das ações

---
### Backend (Clean Architecture)

backend/
├── TodoList.API/ # Camada de apresentação (Controllers)
├── TodoList.Core/ # Camada de domínio (Entities, Interfaces, DTOs)
└── TodoList.Infrastructure/ # Camada de infraestrutura (DbContext, Repositories)

### Frontend (React)
frontend/
├── src/
│ ├── components/ # Componentes React
│ ├── services/ # Serviços (API)
│ ├── styles/ # Tema e estilos globais
│ ├── types/ # Tipagens TypeScript
│ └── App.tsx # Componente principal## 🏗️ Arquitetura do Projeto

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
2. Execute com Docker Compose
   docker-compose up --build
3.  Acesse a aplicação

Frontend: http://localhost:3000

Backend API: http://localhost:5000/api/todo

Documentação da API: http://localhost:5000/scalar

🌐 Deploy em Produção
Serviço	URL	Tecnologia
Frontend	https://todo-list07.vercel.app	Vercel
Backend API	https://todo-list-dc5j.onrender.com	Render
Banco de Dados	PostgreSQL hospedado no Neon	Neon

Vamos nos conectar pelo linkedln! 
https://www.linkedin.com/in/olucasgalvao/

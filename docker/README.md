# Configurações Docker

Este projeto usa Docker para desenvolvimento local.

## Arquivos importantes:
- `docker-compose.yml` → Orquestração dos serviços (raiz)
- `backend/Dockerfile` → Build do backend .NET
- `frontend/Dockerfile` → Build do frontend React

Para rodar localmente:
```bash
docker-compose up --build
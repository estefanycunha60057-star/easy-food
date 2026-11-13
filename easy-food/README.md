# EasyFood API

API modular desenvolvida em Node.js, Express, Prisma ORM e PostgreSQL para gerenciamento de usuários, restaurantes, cardápios e upload/otimização de imagens.

## Funcionalidades

- Cadastro e autenticação de usuários com JWT e criptografia de senha (`bcryptjs`).
- Upload e redimensionamento de foto de perfil do usuário (`POST /auth/me/image`).
- Cadastro e listagem de restaurantes (`GET /restaurants`, `POST /restaurants`).
- Cadastro e consulta de pratos por restaurante (`GET /restaurants/:restaurantId/dishes`, `POST /restaurants/:restaurantId/dishes`).
- Upload e otimização de imagens de pratos em WebP (`POST /dishes/:dishId/image`).
- Serviço compartilhado de processamento de imagens (`Multer` + `Sharp`) e notificações por e-mail.

## Instalação e Execução

1. Instale as dependências:
```bash
npm install
```

2. Configure o arquivo `.env` com a sua `DATABASE_URL` e `JWT_SECRET`.

3. Execute as migrations e gere o Prisma Client:
```bash
npx prisma migrate dev --name init_easyfood
npx prisma generate
```

4. Inicie o servidor:
```bash
npm start
```

# Dieta na Mão

Sistema fullstack com autenticação JWT, criptografia de senha, validações e CRUDs completos.

## 🚀 Tecnologias Utilizadas

- Backend: Node.js, Express, Sequelize (ou Prisma)
- Frontend: React (ou framework escolhido)
- Banco de Dados: MySQL/PostgreSQL
- Autenticação: JWT
- Validações: Regex, lógica customizada (CPF, senha forte)

## 🔐 Funcionalidades

### Autenticação
- Login com e-mail e senha
- Senha criptografada
- Retorno de JWT
- Validação de e-mail e CPF

### Usuário
- Cadastro com nome, e-mail, senha e CPF
- Edição (exceto e-mail), com validações
- Apenas usuário autenticado pode editar seu cadastro

### CRUDs
- 3 recursos CRUD completos
- Todas as rotas autenticadas
- Paginação nas listagens
- Relacionamento entre recursos

## 🧪 Testes e Validações
- Teste de todas as rotas com Insomnia/Postman
- Tratamento de erros e mensagens amigáveis
- Validações client-side e server-side

## 💾 Execução do Projeto

### Backend
```bash
cd backend
npm install
npm run dev

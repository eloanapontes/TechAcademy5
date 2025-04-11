# 🥗 Dieta na Mão / Web Diet

Aplicação completa para ajudar no controle de refeições e alimentos do dia a dia.  
Sistema fullstack com autenticação segura, validações e CRUDs completos.

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js, Express, Sequelize ORM
- **Banco de Dados**: MySQL
- **Autenticação**: JWT com criptografia de senha usando bcrypt
- **Validações**: Regex (e-mail), CPF válido e senha forte
- **Testes**: Jest

## 🔑 Funcionalidades

### Autenticação
- Login seguro com e-mail e senha criptografada
- Retorno de token JWT para acessar as rotas protegidas
- Validação de e-mail e CPF no backend

### Gestão de Usuários
- Cadastro de usuários com nome, e-mail, senha forte e CPF
- Edição de perfil, exceto o e-mail (que não pode ser alterado)
- Somente o próprio usuário consegue editar sua conta

### Alimentos e Refeições
- Cadastro, listagem, atualização e exclusão de alimentos
- Cadastro, listagem, atualização e exclusão de refeições
- Vincular alimentos às refeições e visualizar total de calorias
- Todas as operações protegidas por autenticação
- Paginação nas listagens para melhor navegação

### Testes Automatizados
- Cobertura de testes para cadastro e login de usuários
- Testes para CRUD completo de alimentos e refeições
- Verificações para validar erros e fluxos corretos da API

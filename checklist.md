# ✅ Checklist Projeto Diet App — Tech Academy 5

## 🎯 Estrutura do Projeto
- [x] Estrutura de pastas seguindo modelo `biblioteca-app`
- [x] Configuração do banco de dados MySQL
- [x] Sequelize configurado como ORM
- [x] Tabelas criadas:
  - [x] `usuarios`
  - [x] `alimentos`
  - [x] `refeicoes`
  - [x] `refeicoes_alimentos` (relacionamento)

## 👥 Funcionalidades de Usuário
- [x] Cadastro de usuário funcionando
- [x] Criptografia de senha (bcrypt)
- [ ] Validação de e-mail com Regex
- [ ] Validação de CPF
- [ ] Validação de nível de senha (senha forte)
- [ ] Login de usuário
- [ ] Geração de Token JWT após login
- [ ] Middleware de autenticação para proteger rotas
- [ ] Edição de usuário autenticado (restrito ao próprio usuário)
- [ ] Restrição para não permitir alteração do e-mail
- [ ] Tratamento de erros e mensagens claras na API

## 🍽️ Funcionalidades de Refeições e Alimentos
- [x] Tabelas e relacionamentos funcionando
- [ ] CRUD completo para Alimentos
- [ ] CRUD completo para Refeições
- [ ] Vínculo de alimentos à refeição na criação/edição
- [ ] Paginação nas listagens
- [ ] Validação para edição/exclusão de recursos inexistentes

## 🔐 Autenticação
- [ ] Proteção de todas as rotas dos CRUDs com autenticação JWT
- [ ] Tratamento de erros de autenticação no backend

## 🖥️ Integração com Frontend
- [ ] Conexão do frontend com a API
- [ ] Armazenamento do token JWT no localStorage
- [ ] Redirecionamento de login
- [ ] Tratamento de erros amigável no frontend
- [ ] Paginação nas telas de listagem
- [ ] Componentes reutilizáveis

## 🧼 Boas Práticas
- [x] Estrutura organizada
- [ ] Uso de TypeScript completo e sem `any`
- [ ] Código limpo e respeitando boas práticas
- [ ] Arquivo `.env` para variáveis de ambiente
- [ ] Separação clara entre controllers, services e models
- [ ] Testes básicos cobrindo as funcionalidades principais

## 🧪 Testes
- [ ] Testes para casos de uso obrigatórios da rubrica:
  - Cadastro de usuário
  - Login de usuário
  - Validações de campos obrigatórios

---

### 📌 Observações
- Estrutura baseada no repositório `biblioteca-app`
- Rubrica Tech Academy 5 como referência
- Projeto organizado e pronto para integração com Frontend e Deploy!

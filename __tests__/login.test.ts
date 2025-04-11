

import request from 'supertest';
import app from '../src/app';
import sequelize from '../src/config/database';


describe('Testes de Login', () => {
    jest.setTimeout(40000);
  beforeAll(async () => {
    await sequelize.sync({ force: true });

    await request(app)
      .post('/api/usuarios')
      .send({
        nome: 'Login Teste',
        email: 'login@teste.com',
        senha: 'Senha@123',
        cpf: '12345678909',
      });
  });

  it('deve fazer login com sucesso', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'login@teste.com',
        senha: 'Senha@123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('deve falhar ao logar com e-mail inválido', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'email_invalido',
        senha: 'Senha@123',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('E-mail inválido.');
  });

  it('deve falhar ao logar com e-mail inexistente', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'naoexiste@teste.com',
        senha: 'Senha@123',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Usuário não encontrado.');
  });

  it('deve falhar ao logar com senha incorreta', async () => {
    const response = await request(app)
      .post('/api/login')
      .send({
        email: 'login@teste.com',
        senha: 'SenhaErrada@123',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Senha incorreta.');
  });
});

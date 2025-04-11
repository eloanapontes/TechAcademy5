import request from 'supertest';
import app from '../src/app';
import sequelize from '../src/config/database';
import { setupAssociations } from '../src/models/associations';

let token: string;

beforeAll(async () => {
  setupAssociations();
  await sequelize.sync({ force: true });


  await request(app)
    .post('/api/usuarios')
    .send({
      nome: 'Teste User',
      email: 'teste@alimento.com',
      senha: 'Senha@123',
      cpf: '12345678909',
    });

  const loginResponse = await request(app)
    .post('/api/login')
    .send({ email: 'teste@alimento.com', senha: 'Senha@123' });

  token = loginResponse.body.token;
});

describe('Testes CRUD de Alimentos', () => {
    jest.setTimeout(40000);
  let alimentoId: number;

  it('deve criar um alimento', async () => {
    const response = await request(app)
      .post('/api/alimentos')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Banana', calorias: 100 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    alimentoId = response.body.id;
  });

  it('deve listar alimentos', async () => {
    const response = await request(app)
      .get('/api/alimentos')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.dados.length).toBeGreaterThan(0);
  });

  it('deve atualizar um alimento existente', async () => {
    const response = await request(app)
      .put(`/api/alimentos/${alimentoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Banana Prata', calorias: 105 });

    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('Banana Prata');
  });

  it('deve deletar um alimento existente', async () => {
    const response = await request(app)
      .delete(`/api/alimentos/${alimentoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('deve falhar ao deletar alimento inexistente', async () => {
    const response = await request(app)
      .delete(`/api/alimentos/9999`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});

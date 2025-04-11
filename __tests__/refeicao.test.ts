import request from 'supertest';
import app from '../src/app';
import sequelize from '../src/config/database';
import { setupAssociations } from '../src/models/associations';

let token: string;
let alimentoId: number;
let refeicaoId: number;

beforeAll(async () => {
  setupAssociations();
  await sequelize.sync({ force: true });

  await request(app)
    .post('/api/usuarios')
    .send({
      nome: 'Teste User',
      email: 'teste@refeicao.com',
      senha: 'Senha@123',
      cpf: '12345678909',
    });

  const loginResponse = await request(app)
    .post('/api/login')
    .send({ email: 'teste@refeicao.com', senha: 'Senha@123' });

  token = loginResponse.body.token;

  const alimentoResponse = await request(app)
    .post('/api/alimentos')
    .set('Authorization', `Bearer ${token}`)
    .send({ nome: 'Arroz', calorias: 130 });

  alimentoId = alimentoResponse.body.id;
});

describe('Testes CRUD de Refeições', () => {
    jest.setTimeout(40000);
  it('deve criar uma refeição com alimentos', async () => {
    const response = await request(app)
      .post('/api/refeicoes')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: 'Almoço', alimentos: [alimentoId] });

    expect(response.status).toBe(201);
    expect(response.body.refeicao).toHaveProperty('id');
    refeicaoId = response.body.refeicao.id;
  });

  it('deve listar refeições com total de calorias', async () => {
    const response = await request(app)
      .get('/api/refeicoes')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.dados.length).toBeGreaterThan(0);
    expect(response.body.dados[0]).toHaveProperty('totalCalorias');
  });

  it('deve atualizar alimentos de uma refeição', async () => {
    const response = await request(app)
      .put(`/api/refeicoes/${refeicaoId}/alimentos`)
      .set('Authorization', `Bearer ${token}`)
      .send({ alimentos: [alimentoId] });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Alimentos da refeição atualizados com sucesso!');
  });

  it('deve deletar uma refeição', async () => {
    const response = await request(app)
      .delete(`/api/refeicoes/${refeicaoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  it('deve falhar ao deletar refeição inexistente', async () => {
    const response = await request(app)
      .delete(`/api/refeicoes/9999`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
  });
});

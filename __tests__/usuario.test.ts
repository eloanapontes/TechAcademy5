import request from 'supertest';
import app from '../src/app';

function gerarCPFValido() {
  let n = 9;
  let n1 = Math.floor(Math.random() * n);
  let n2 = Math.floor(Math.random() * n);
  let n3 = Math.floor(Math.random() * n);
  let n4 = Math.floor(Math.random() * n);
  let n5 = Math.floor(Math.random() * n);
  let n6 = Math.floor(Math.random() * n);
  let n7 = Math.floor(Math.random() * n);
  let n8 = Math.floor(Math.random() * n);
  let n9 = Math.floor(Math.random() * n);

  let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
  d1 = 11 - (d1 % 11);
  if (d1 >= 10) d1 = 0;

  let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
  d2 = 11 - (d2 % 11);
  if (d2 >= 10) d2 = 0;

  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
}

describe('Testes de Usuário', () => {

  it('deve cadastrar um novo usuário com sucesso', async () => {
    const response = await request(app)
      .post('/api/usuarios')
      .send({
        nome: 'Teste User',
        email: 'teste' + Date.now() + '@tads.com',
        senha: 'Senha@123',
        cpf: gerarCPFValido(),
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Usuário criado com sucesso!');
  });

  it('deve falhar ao cadastrar usuário com e-mail inválido', async () => {
    const response = await request(app)
      .post('/api/usuarios')
      .send({
        nome: 'Teste User',
        email: 'email_invalido',
        senha: 'Senha@123',
        cpf: gerarCPFValido(),
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'E-mail inválido.');
  });
});

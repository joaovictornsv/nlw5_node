import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Olá NLW' });
});

app.post('/', (req, res) => {
  res.json({ message: 'Usuário cadastrado' });
});

export default app;

import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Olá NLW' });
});

app.post('/', (req, res) => {
  res.json({ message: 'Usuário cadastrado' });
});

app.listen('3333', () => console.log('Server is running on port 3333'));

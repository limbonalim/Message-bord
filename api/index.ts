import express from 'express';

const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('The server is work now');
});

app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});
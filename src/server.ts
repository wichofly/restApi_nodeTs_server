import express from 'express';

const server = express();

// Route example
server.get('/', (req, res) => {
  // res.json(data);
  res.send('from Get');
});

server.post('/', (req, res) => {
  // res.json(data);
  res.send('from Post');
});

server.put('/', (req, res) => {
  // res.json(data);
  res.send('from Put');
});

server.patch('/', (req, res) => {
  // res.json(data);
  res.send('from Patch');
});

server.delete('/', (req, res) => {
  // res.json(data);
  res.send('from Delete');
});

export default server;

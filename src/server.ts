import express from 'express';

const server = express();

// Route example
server.get('/', (req, res) => {

  const data = [
    { id: 1, name: 'Juan' },
    { id: 2, name: 'Pedro' },
    { id: 3, name: 'Pablo' },
  ];

  // res.json(data);
  res.send(data);
});

export default server;

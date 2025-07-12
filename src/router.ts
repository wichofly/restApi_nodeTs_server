import { Router } from 'express';

const router = Router();

// Route example
router.get('/', (req, res) => {
  // res.json(data);
  res.send('from GetTt');
});

router.post('/', (req, res) => {
  // res.json(data);
  res.send('from Post');
});

router.put('/', (req, res) => {
  // res.json(data);
  res.send('from Put');
});

router.patch('/', (req, res) => {
  // res.json(data);
  res.send('from Patch');
});

router.delete('/', (req, res) => {
  // res.json(data);
  res.send('from Delete');
});

export default router;

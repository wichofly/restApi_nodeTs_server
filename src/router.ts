import { Router } from 'express';
import { createProduct } from './handlers/product';

const router = Router();

// Route example
router.get('/', (req, res) => {
  // res.json(data);
  res.send('from Get');
});

router.post('/', createProduct);

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

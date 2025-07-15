import { Router } from 'express';
import { body } from 'express-validator';

import { createProduct } from './handlers/product';

const router = Router();

// Route example
router.get('/', (req, res) => {
  // res.json(data);
  res.send('from Get');
});

router.post(
  '/',

  // Validation
  body('name').notEmpty().withMessage('Name is required'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value) => value > 0)
    .withMessage('Price must be greater than zero')
    .notEmpty()
    .withMessage('Price is required'),

  createProduct
);

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

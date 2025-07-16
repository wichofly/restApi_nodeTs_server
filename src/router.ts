import { Router } from 'express';
import { body, param } from 'express-validator';

import { createProduct, getProductById, getProducts } from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();

// Route example
router.get('/', getProducts);

router.get(
  '/:id',
  param('id').isNumeric().withMessage('ID must be a number'),
  handleInputErrors,
  getProductById
);

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

  handleInputErrors,
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

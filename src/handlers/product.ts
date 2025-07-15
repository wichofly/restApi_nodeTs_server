import { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import Product from '../models/Product.model';

export const createProduct = async (req: Request, res: Response) => {
  // Validation
  await check('name').notEmpty().withMessage('Name is required').run(req);
  await check('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value) => value > 0)
    .withMessage('Price must be greater than zero')
    .notEmpty()
    .withMessage('Price is required')
    .run(req);

  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Creates and saves the product in one step
  const product = await Product.create(req.body);

  res.send({ data: product });
};

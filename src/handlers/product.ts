import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Product from '../models/Product.model';

export const createProduct = async (req: Request, res: Response) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Creates and saves the product in one step
  const product = await Product.create(req.body);

  res.send({ data: product });
};

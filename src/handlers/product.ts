import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const createProduct = async (req: Request, res: Response) => {
  try {
    // Creates and saves the product in one step
    const product = await Product.create(req.body);
    res.send({ data: product });
  } catch (error) {
    console.error('Error creating product:', error);
  }
};

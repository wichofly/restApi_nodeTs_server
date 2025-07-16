import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [['price', 'DESC']], // Order by price in descending order
      attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }, // Exclude timestamps and availability from the response
    });
    res.send({ data: products });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    // console.log('Fetching product with ID', req.params.id);
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    res.send({ data: product });
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    // Creates and saves the product in one step
    const product = await Product.create(req.body);
    res.send({ data: product });
  } catch (error) {
    console.error('Error creating product:', error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send({ error: 'Product not found' });
    }

    // Update the product with the new data
    await product.update(req.body);
    res.send({ data: product });
  } catch (error) {
    console.error('Error updating product:', error);
  }
};

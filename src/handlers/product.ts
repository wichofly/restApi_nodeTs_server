import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({
    order: [['price', 'DESC']], // Order by price in descending order
    attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }, // Exclude timestamps and availability from the response
  });
  res.send({ data: products });
};

export const getProductById = async (req: Request, res: Response) => {
  // console.log('Fetching product with ID', req.params.id);
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).send({ error: 'Product not found' });
  }

  res.send({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  // Creates and saves the product in one step
  const product = await Product.create(req.body);
  res.status(201).send({ data: product });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).send({ error: 'Product not found' });
  }

  // Update the product with the new data
  await product.update(req.body);
  res.send({ data: product });
};

export const updateAvailabilityWithPatch = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).send({ error: 'Product not found' });
  }

  // Update availability with the new data
  await product.update({ availability: !product.availability });
  res.send({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).send({ error: 'Product not found' });
  }

  await product.destroy();
  res.send({ data: `Product with ID-${id} deleted successfully` });
};

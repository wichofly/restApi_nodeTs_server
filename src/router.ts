import { Router } from 'express';
import { body, param } from 'express-validator';

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailabilityWithPatch,
  updateProduct,
} from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: The unique identifier for the product.
 *           example: 1
 *         name:
 *           type: string
 *           description: The name of the product.
 *           example: "Sample Product"
 *         price:
 *           type: number
 *           description: The price of the product.
 *           example: 19.99
 *         availability:
 *           type: boolean
 *           description: The availability status of the product.
 *           example: true
 */

// Route example

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [Products]
 *     description: Returns a list of all products in the database.
 *     responses:
 *       200:
 *         description: Successful response.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     description: Returns a single product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response with product data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 *       400:
 *        description: Bad Request - Invalid ID.
 */
router.get(
  '/:id',
  param('id').isNumeric().withMessage('ID must be a number'),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     description: Creates a new product in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "New Product"
 *               price:
 *                 type: number
 *                 example: 29.99
 *     responses:
 *       201:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *        description: Bad Request - Invalid input data.
 */
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

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     description: Updates an existing product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The ID of the product to update.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Product"
 *               price:
 *                 type: number
 *                 example: 8.99
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad Request - Invalid ID or Invalid input data.
 *       404:
 *         description: Product not found.
 */
router.put(
  '/:id',

  // Validation is used to update all columns in the model (name, price, availability).
  param('id').isNumeric().withMessage('ID must be a number'),
  body('name').notEmpty().withMessage('Name is required'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .custom((value) => value > 0)
    .withMessage('Price must be greater than zero')
    .notEmpty()
    .withMessage('Price is required'),
  body('availability')
    .isBoolean()
    .withMessage('Availability must be a boolean'),

  handleInputErrors,
  updateProduct
);

router.patch(
  '/:id',
  param('id').isNumeric().withMessage('ID must be a number'),
  handleInputErrors,
  updateAvailabilityWithPatch
);

router.delete(
  '/:id',
  param('id').isNumeric().withMessage('ID must be a number'),
  handleInputErrors,
  deleteProduct
);

export default router;

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

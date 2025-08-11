# Products REST API - Express + TypeScript + PostgreSQL

This is a RESTful API built with **Node.js**, **Express**, and **TypeScript**, using **Sequelize** as the ORM to interact with a **PostgreSQL** database hosted on **Render**.

The API allows full CRUD operations on `Product` records, and includes request validation, structured error handling, and clean modular code.

## Key Technologies Used

- **Express**: Web framework used to handle routing and HTTP request logic.
- **TypeScript**: Provides static typing and improved code safety.
- **[Sequelize](https://sequelize.org/docs/v6/)**: ORM used to define models and interact with the PostgreSQL database.
- **[sequelize-typescript](https://sequelize.org/docs/v7/models/data-types/)**: Adds decorator-based syntax for models (e.g. @Table, @Column).
- **PostgreSQL**: The relational database, hosted on Render.
- **dotenv**: Loads environment variables securely.
- **[express-validator](https://express-validator.github.io/docs/)**: Middleware to validate incoming request data.
- **Thunder Client**: Used for testing endpoints inside VSCode.
- **DBeaver**: GUI client used to visually inspect and manage the PostgreSQL database.

## Functionality Implemented

- POST `/api/products`: Create a new product (with validation)
- GET `/api/products`: Fetch all products (sorted by price, with some fields excluded)
- GET `/api/products/:id`: Fetch a specific product by ID
- PUT `/api/products/:id`: Fully update a product (requires all fields)
- PATCH `/api/products/:id`: Toggle the product's availability
- DELETE `/api/products/:id`: Delete a product by ID

## Additional Features

- Middleware `handleInputErrors` checks validation results before route logic.
- Database connection is established on server startup with SSL enabled for Render.
- `express.json()` middleware parses JSON request bodies.
- Routes and handlers are separated into clean modules for scalability.

---

## 🧪 Testing

The application includes an extensive automated test suite using:

- **[Jest](https://jestjs.io/)**: JavaScript testing framework
- **[Supertest](https://github.com/ladjs/supertest)**: For HTTP integration testing
- **`jest.mock()`**: To isolate and mock database connections and errors
- **`ts-jest`**: For running TypeScript code through Jest

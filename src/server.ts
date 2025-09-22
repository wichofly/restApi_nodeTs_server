import express from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import colors from 'colors';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import router, { authRouter } from './router';
import db from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

// database connection
export async function connectToDatabase() {
  try {
    await db.authenticate();
    db.sync(); // Create new models and columns added to the database
    // console.log(
    //   colors.blue('Database connection established successfully. ✅')
    // );
  } catch (error) {
    console.log(colors.red.bold('Unable to connect to the database:'), error);
  }
}

connectToDatabase();

// Allowed connections
const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173'];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Error from CORS'));
    }
  },
};
server.use(cors(corsOptions));

server.use(express.json()); // Middleware to parse JSON bodies

server.use(morgan('dev'));

server.use('/api', authRouter);

server.use((req, res, next) => {
  console.log('Solicitud entrante:', req.method, req.url);
  next();
});

server.use('/api/products', router);

server.get('/api', (req, res) => {
  res.send({ msg: 'Welcome to the Products API' });
});

server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

console.log('Servidor en ejecución. Rutas montadas en /api');

export default server;

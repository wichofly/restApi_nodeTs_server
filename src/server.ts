import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import dotenv from 'dotenv';
import db from './config/db';
import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import router, { authRouter } from './router';

dotenv.config();

const server = express();

let databaseReady: Promise<boolean> | undefined;

// database connection
export async function connectToDatabase(): Promise<boolean> {
  try {
    await db.authenticate();
    await db.sync(); // Create new models and columns added to the database
    // console.log(
    //   colors.blue('Database connection established successfully. ✅')
    // );
    return true;
  } catch (error) {
    console.log(colors.red.bold('Unable to connect to the database:'), error);
    return false;
  }
}

function getDatabaseReady() {
  if (!databaseReady) {
    databaseReady = connectToDatabase().then((connected) => {
      if (!connected) databaseReady = undefined;
      return connected;
    });
  }

  return databaseReady;
}

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

// Netlify may handle a request immediately after a cold start. Wait for the
// shared database initialization before allowing a route to query a model.
server.use(async (_req, res, next) => {
  const connected = await getDatabaseReady();

  if (!connected) {
    res.status(503).send({ error: 'Database is temporarily unavailable' });
    return;
  }

  next();
});

server.use('/api', authRouter);

server.use('/api/products', router);

server.get('/api', (req, res) => {
  res.send({ msg: 'Welcome to the Products API' });
});

server.get('/openapi.json', (_req, res) => {
  res.json(swaggerSpec);
});

server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;

import express from 'express';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import colors from 'colors';
import swaggerUi from 'swagger-ui-express';

import swaggerSpec, { swaggerUiOptions } from './config/swagger';
import router from './router';
import db from './config/db';

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
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error('Error from CORS'));
    }
  },
};

server.use(cors(corsOptions));

server.use(express.json()); // Middleware to parse JSON bodies

server.use(morgan('dev'))

server.use('/api/products', router);

server.get('/api', (req, res) => {
  res.send({ msg: 'Welcome to the API' });
});

server.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, swaggerUiOptions)
);

export default server;

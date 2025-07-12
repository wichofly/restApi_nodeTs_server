import express from 'express';
import colors from 'colors';
import router from './router';
import db from './config/db';

const server = express();

// database connection
async function connectToDatabase() {
  try {
    await db.authenticate();
    db.sync(); // Create new models and columns added to the database
    console.log(
      colors.blue('Database connection established successfully. ✅')
    );
  } catch (error) {
    console.error(colors.red.bold('Unable to connect to the database:'), error);
  }
}

connectToDatabase();

server.use('/api/products', router);

export default server;

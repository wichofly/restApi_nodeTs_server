import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const db = new Sequelize(process.env.DATABASE_URL!, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Allow self-signed certificates (Render usually requires this)
    },
  },
  models: [__dirname + '/../models/**/*.ts'], // Path to models
  logging: false, // Disable logging; default: console.log
});

export default db;

/**
 * Database configuration using Sequelize.
 * This file sets up the connection to the database using environment variables.
 * It uses SSL for secure connections, which is often required in production environments.
 * https://sequelize.org/docs/v6/getting-started/
 * -------------------------------------------------------------------------------
 * dotenv is used to load environment variables from a .env file.
 */

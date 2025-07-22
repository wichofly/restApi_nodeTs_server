import { exit } from 'node:process';
import db from '../config/db';
import colors from 'colors';

const clearDatabase = async () => {
  try {
    await db.sync({ force: true }); // This will drop and recreate the database
    console.log(colors.blue('Database cleared successfully.'));
    exit(0);
  } catch (error) {
    console.error('Error clearing the database:', error);
    exit(1);
  }
};

if (process.argv[2] === '--clear') {
  clearDatabase();
}

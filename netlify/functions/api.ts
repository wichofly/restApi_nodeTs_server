import serverless from 'serverless-http';
import server from '../../src/server';

export const handler = serverless(server);

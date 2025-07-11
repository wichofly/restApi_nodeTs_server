import { Sequelize } from 'sequelize';

const db = new Sequelize(
  'postgresql://rest_api_node_typescript_fmlp_user:xWLNVBBQnlkgAgEhgvMzlyYbWPsbQRzi@dpg-d1om0k3uibrs73cun900-a.oregon-postgres.render.com/rest_api_node_typescript_fmlp',
  {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Allow self-signed certificates (Render usually requires this)
      },
    },
  }
);

export default db;

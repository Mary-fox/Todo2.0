import { Sequelize } from 'sequelize';

const dbConfig = {
  host: 'localhost',
  database: 'postgres',
  username: 'postgres',
  password: 'Silvanaida1',
  port: 5432, 
};


const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'postgres', 
});

export default sequelize;


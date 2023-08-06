import { Sequelize } from 'sequelize';

// Здесь необходимо указать вашу информацию для подключения к PostgreSQL
const dbConfig = {
  host: 'localhost',
  database: 'postgres',
  username: 'postgres',
  password: 'Silvanaida1',
  port: 5432, // Порт, по которому работает PostgreSQL
};

// Инициализация соединения с базой данных
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'postgres', // Используем PostgreSQL
});

export default sequelize;


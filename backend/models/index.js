const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'frontback19',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || 'password',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: console.log,
    }
);

const User = require('./User')(sequelize);

sequelize.authenticate()
    .then(() => console.log('Подключено к PostgreSQL'))
    .catch(err => console.error('Ошибка подключения:', err));

sequelize.sync({ alter: true })
    .then(() => console.log('Модели синхронизированы'))
    .catch(err => console.error('Ошибка синхронизации:', err));

module.exports = {
    sequelize,
    User
};
const env = require('./env.js');
 
const Sequelize = require('sequelize');
// console.log("---info--->", env);
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
 
  pool: {
    max: env.pool.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.chainage = require('../model/chainage.model')(sequelize, Sequelize);
 
module.exports = db;
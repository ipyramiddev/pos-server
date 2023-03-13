const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.sequelize = sequelize;

db.category = require("./Category.model")(sequelize);
db.product = require('./Product.model')(sequelize);
db.user = require('./User.model')(sequelize);
db.brand = require('./Brand.model')(sequelize);
db.outlet = require('./Outlet.model')(sequelize);
db.constants = require('./Constants.model')(sequelize);
db.license = require('./License.model')(sequelize);
module.exports = db;
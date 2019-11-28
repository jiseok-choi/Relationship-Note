'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

db.User = require('./user')(sequelize, Sequelize);
db.Friend = require('./friend')(sequelize, Sequelize);
db.News = require('./news')(sequelize, Sequelize);
db.Schedule = require('./schedule')(sequelize, Sequelize);
db.Event = require('./event')(sequelize, Sequelize);
db.Wedding = require('./wedding')(sequelize, Sequelize);
db.Visit = require('./visit')(sequelize, Sequelize);
db.Party = require('./party')(sequelize, Sequelize);

//1대다 관계 맺기
db.User.hasMany(db.Friend);
db.Friend.belongsTo(db.User);

db.Friend.hasMany(db.News);
db.News.belongsTo(db.Friend);

db.User.hasMany(db.Schedule);
db.Schedule.belongsTo(db.User);

db.Friend.hasMany(db.Schedule);
db.Schedule.belongsTo(db.Friend);

db.Event.hasOne(db.Wedding, {
  foreignKey: 'fk_eventId',
  onDelete: 'CASCADE'
});
db.Wedding.belongsTo(db.Event);

db.Event.hasMany(db.Visit, {
  foreignKey: 'fk_eventId',
  onDelete: 'CASCADE'
});
db.Visit.belongsTo(db.Event);

db.Event.hasOne(db.Party, {
  foreignKey: 'fk_eventId',
  onDelete: 'CASCADE',
});
db.Party.belongsTo(db.Event);


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;

//const sequelize = require("../db");
var models = require('../models/sequelize');
const { hash, compare } = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phoneno: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address:{
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  /*
  User.beforeCreate(async user => {
    const hashedPassword = await hash(user.password, 10);
    user.password = hashedPassword;
  });

  User.beforeUpdate(async user => {
    if (user.password) {
      const hashedPassword = await hash(user.password, 10);
      user.password = hashedPassword;
    }
  });*/
  // User.associate = (models) => {
  //   User.hasOne(models.Book, {
  //     foreignKey: 'bookId',
  //     as: 'selfJoin',
  //   });
  // };
  // sync table if you are running this first time so it create a table in db
   //User.sync({ force: true });
  return User;
};
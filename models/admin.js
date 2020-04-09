//const sequelize = require("../db");
var models = require('../models/sequelize');
const { hash, compare } = require("bcryptjs");
const {Sequelize,Model}=require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneno: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      jwt:{
        type: DataTypes.STRING(1234),
        allowNull:true
      }
  });
  /*Admin.beforeCreate(async admin => {
    const hashedPassword = await hash(admin.password, 10);
    admin.password = hashedPassword;
  });*/

  /*Admin.beforeUpdate(async admin => {
    if (admin.password) {
      const hashedPassword = await hash(admin.password, 10);
      admin.password = hashedPassword;
    }
  });*/
 
  // Admin.associate = (models) => {
  //   Admin.hasOne(models.Book, {
  //     foreignKey: 'bookId',
  //     as: 'book',
  //   });
  // };
  // sync table if you are running this first time so it create a table in db
  //Admin.sync({ force: true });
  return Admin;
};
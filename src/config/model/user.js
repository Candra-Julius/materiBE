const db = require('../database/database')

const { DataTypes } = require('sequelize');

const User = db.define(
  'user',
  {
    id_user : {
        type: DataTypes.STRING, 
    }, 
	firstname: {
        type: DataTypes.STRING, 
    }, 
	lastname:  {
        type: DataTypes.STRING, 
    }, 
	username:  {
        type: DataTypes.STRING, 
    }, 
    password: {
        type: DataTypes.STRING, 
    }, 
    create_at: {
        type: DataTypes.DATE
    }, 
    update_at: {
        type: DataTypes.DATE
    }
  },
  {
    schema: 'yahya', 
    freezeTableName: true, 
    timestamps: false
  },
);

User.removeAttribute("id");

module.exports = User
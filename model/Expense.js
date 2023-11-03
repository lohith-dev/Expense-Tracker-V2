const Sequelize = require('sequelize');
const sequelize  = require('../util/database');

const Expense = sequelize.define('expense',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement :true,
    allowNull:false,
    primaryKey:true
  }, 
  
  expense: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  category :{   
    type: Sequelize.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  
},
{
    timestamps: true,
    underscored: true
})


module.exports = Expense;

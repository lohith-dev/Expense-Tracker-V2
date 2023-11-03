const Sequelize = require('sequelize');
const expenseModel= require('./Expense.js')

const sequelize  = require('../util/database');
console.log(expenseModel);
const User = sequelize.define('User',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement :true,
    allowNull:false,
    primaryKey:true
  }, 
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique:true,
    allowNull: false,
  },
  password :{  
    type: Sequelize.STRING,
    allowNull: false,
  }
},
{
    timestamps: true,
    underscored: true
})

User.hasMany(expenseModel, { foreignKey: 'userId' });  
expenseModel.belongsTo(User, { foreignKey: 'userId' });

module.exports = User;

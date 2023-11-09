const expenseModel = require('../model/Expense.js');
const sequelize = require('../util/database.js')
const userModel = require('../model/User.js');

const getLeadboardData = async (req,res)=>{

 try{
    expenseModel.findAll({
       
        attributes: ['userId',[sequelize.literal('User.name'), 'name'],[sequelize.fn('SUM', sequelize.col('expense')), 'totalExpense']],
        include: [{ model: userModel, attributes: [] }], 
        group: ['userId'],  
        order: sequelize.literal('totalExpense DESC'),
    }).then(results => {
        console.log(results);
        res.send(results)
    }).catch(error => {
        console.error('Error:', error);
    });
            
    }catch(err){
        console.log(err);
    }

}




module.exports={
    getLeadboardData,
}
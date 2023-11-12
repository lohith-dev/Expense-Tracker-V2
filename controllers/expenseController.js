const expenseModel = require('../model/Expense.js');
const userModel = require('../model/User.js')
const Sequelize = require('../util/database.js')
const sequelize = require('../util/database.js')

const getappntdata = async (req,res)=>{
     try{
        let {id}=req.user;
            const userData = await expenseModel.findAll({where:{user_id:id}});
      
            let noOfRecords = userData.length;
            res.status(200).json(
                {
                    noOfRecords: noOfRecords,
                    data: userData,
                }
            );
            
     }catch(err){
        console.log(err);
     }
}


const getSingleAppntData = async (req,res)=>{
     try{
            
            let id=req.params.id;
            
       
            const userData = await expenseModel.findOne({
                where: { id: id },
            });
           
            if(!userData) return res.status(404).send("The appointement data with provided ID does not exist!");
            res.status(200).json(userData);
            
     }catch(err){
        console.log(err);
     }
}

const postAppntdata = async (req,res)=>{
    try{
   
        let {expense,description,category}=req.body;
        let {id}=req.user;

        const result = await sequelize.transaction(async (t) => {

            const user = await expenseModel.create({
                expense,description,category,userId:id
            }, { transaction: t });

            let totExpense = parseInt(req.user.totalExpenses)+parseInt(expense);
            await userModel.update({totalExpenses:totExpense},{where:{id:id}, transaction: t });
        
            return user;
        
          });
    
           res.status(201).json({
            error: false,
            message: 'Appiontments created Successfully',
            data: result
        })
           
    }catch(err){

       console.log(err);
    }
}

const updAppntdata = async (req,res)=>{
    try{
        let {id,expense,description,category}=req.body;
    
        let date = new Date();



        // const number = parseInt(id, 10)
        // console.log(number,typeof(number));
        // console.log(Number(id));
        // console.log(Sequelize.literal('CURRENT_TIMESTAMP'));
        

        const deviceResponse = await expenseModel.update(
            {
                expense: expense,
                description: description,
                category: category,

              },
            {
                where: { id: id },
            })

            res.status(200).json(deviceResponse[1])
    }catch(err){
        console.log(err);
    }
}

const deleteAppntdata = async (req,res)=>{
    try{
        let id=req.params.id;
        
    //    let deleted=await expenseModel.destroy({
    //         where: {
    //           id: id
    //         }
    //       })
    let delData= await expenseModel.findOne({where:{id:id}})
    let subExpense = parseInt(req.user.totalExpenses)-parseInt(delData.dataValues.expense);
    console.log(subExpense);
    const result = await sequelize.transaction(async (t) => {
         let subExpense = parseInt(req.user.totalExpenses)-parseInt(delData.dataValues.expense);
       
         const user = await userModel.update({totalExpenses:subExpense},{where:{id:req.user.id}, transaction: t });
          
        await expenseModel.destroy({
            where: {
              id: id
            }
          })
        return user;
    
      });
         
    
            res.status(200).json({
                  error: false,
                  message: 'Appointment Deleted Successfully',
            })
     
           
    }catch(err){
       console.log(err);
    }
}

module.exports={
    getappntdata,
    postAppntdata,
    updAppntdata,
    deleteAppntdata,
    getSingleAppntData,
}
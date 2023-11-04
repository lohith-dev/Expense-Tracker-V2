const expenseModel = require('../model/Expense.js');
const Sequelize = require('../util/database.js')

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
       console.log("useridddddddddddddd",id);
        let appntResponse = await expenseModel.create({
            expense,description,category,userId:id
        })
           
           res.status(201).json({
            error: false,
            message: 'Appiontments created Successfully',
            data: appntResponse
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
        console.log(id);
       let deleted= expenseModel.destroy({
            where: {
              id: id,
              user_id: req.user.id
            }
          })
       if(deleted){
            res.status(200).json({
                  error: false,
                  message: 'Appointment Deleted Successfully',
            })
       }
           
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
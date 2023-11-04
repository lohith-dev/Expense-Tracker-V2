const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')

const errorController = require('./controllers/error');
require('dotenv').config();

const sequelize = require('./util/database');
const app = express();

app.use(cors());

const userRouter = require('./routes/userRouter.js');
const expenseRouter = require('./routes/expenseRouter.js');

const purchaseRouter = require('./routes/pruchaseRouter.js')

app.use(express.json());


app.use('/auth', userRouter);
app.use('/expense', expenseRouter);
app.use('/purchase', purchaseRouter);


app.use(errorController.get404);
// {force:true}
sequelize.sync().then(result=>{
    app.listen(8000,()=>{
        console.log("Server listening at port 8000");
    });
})
.catch(err=>{
    console.log(err);
})

// app.listen(8000,()=>{
//     console.log("Server listening at port 8000");
// });
module.exports=app;



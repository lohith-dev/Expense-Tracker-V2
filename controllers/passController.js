const userModel = require('../model/User.js');
const Sequelize = require('../util/database.js')
const Sib = require('sib-api-v3-sdk')

require('dotenv').config()


let sendEmail = async (req, res, next)=>{
    const {email}=req.body;
    console.log(email);
    const client = Sib.ApiClient.instance
    const apiKey = client.authentications['api-key']
    apiKey.apiKey = process.env.API_KEY

    const isUserExists = await userModel.findOne({ where: { email: email } });

    if(!isUserExists){
        res.status(404).json({
            error: true,
            message: "User doesn't exists..",
            data: null
        });
    }else{
        const tranEmailApi = new Sib.TransactionalEmailsApi()
        const sender = {
            email: 'srlohith92@gmail.com',
            name: 'lohith',
        }
        const receivers = [
            {
                email:email,
            },
        ]

    tranEmailApi
        .sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Subscribe to Cules Coding to become a developer',
            textContent: `
            Cules Coding will teach you how to become {{params.role}} a developer.
            `,
            htmlContent: `
            <h1>Cules Coding</h1>
            <a href="https://cules-coding.vercel.app/">Visit</a>
                    `,
            params: {
                role: 'Frontend',
            },
        })
        .then(()=>{
            res.status(200).json({
                message: "Email successfully sent...",
                data: null
            });
        })
        .catch(console.log)
    }

}


module.exports={
    sendEmail
}
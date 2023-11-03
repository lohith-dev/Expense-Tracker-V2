const userModel = require('../model/User.js');
const Sequelize = require('../util/database.js')

const signup = async (req, res, next) => {

    console.time("authController : signup");
    let { name, email,password } = req.body;
    email = email.toLowerCase();
    console.log("authController : signup :: email is ", email);
    try {
        const isUserExists = await userModel.findOne({ where: { email: email } });
        console.log("authController : signup :: isUserExists : ", isUserExists);
        // when the user already register.
        if (isUserExists) {
            res.status(409).json({
                error: true,
                message: "User already exists..",
                data: null
            });
        } else {

            let userResponse = await userModel.create({
                    name,email, password,
                })

            if(userResponse){
                res.status(200).json({
                    error: false,
                    message: 'Register Successfully',
                    data: [userResponse]
                })
            }
        
        }
    } catch (err) {
        next(err)
    } finally {
        console.timeEnd("authController : signup");
    }

}

let signin = async (req, res, next)=>{
    console.time("authController : signup");
    let {email,password } = req.body;
    email = email.toLowerCase();
    console.log("authController : signup :: email is ", email);
    try {
        const UserData = await userModel.findOne({ where: { email: email } });
        // when the user already register.
        console.log(UserData);
        if (UserData) {
            if(UserData.password===password){
                res.status(200).json({
                    error: false,
                    message: "Login Succesfull",
                    data: null
                });    
            }else{
                res.status(404).json({
                    error: true,
                    message: "Invalid Password",
                    data: null
                });  
            }
            
        } else {

            // let userResponse = await userModel.create({
            //         name,email, password,
            //     })

            // if(userResponse){
            //     res.status(200).json({
            //         error: false,
            //         message: 'Register Successfully',
            //         data: [userResponse]
            //     })
            // }
            res.status(404).json({
                error: true,
                message: "User not found",
                data: null
            });
        
        }
    } catch (err) {
        next(err)
    } finally {
        console.timeEnd("authController : signup");
    }
}
module.exports={
    signup,
    signin,
}
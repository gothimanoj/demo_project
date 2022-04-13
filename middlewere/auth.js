const jwt = require('jsonwebtoken');
const Register = require('../controller/registerController.js');

const userAuth = async(req,res,next)=>{
    let token
    const {authorization} = req.headers
 
    if(authorization && authorization.startsWith('Bearer')){
        try {
            //getting token from header
            token = authorization.split(' ')[1]
            //verify token
             
            const userID = jwt.verify(token,process.env.jwt_secret_key)
            if(userID){
                  
                next()
            }else{
            return res.json({msg:"Unauthorized user"})
            }
        } catch (err) {
            return res.json({msg:err.message})
        }
    }
    if(!token){
        return res.json({msg:"Unauthorized user, no token!!"})
    }
} 
module.exports = userAuth;
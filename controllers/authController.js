const user=require("../models/userModel")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const registerController=async(req,res)=>{
    try{
        const {name,email,password}=req.body

        const existingUser=await user.findOne({email})
        if(existingUser){
            return res.status(409).json({"message":"user already exist"})
        }
        //hashing the password
        const saltRounds=10
        const hashedPass=bcrypt.hashSync(password,saltRounds)
        const userdata={
            name:name,
            email:email,
            password:hashedPass
        }
        const data=new user(userdata)
        //console.log(userdata)
        //saving to database
        const saved=await data.save();
        //console.log("saved= "+saved)
         if(saved){   
        res.status(200).send({
            success: true,
            message: "User account created successfully",

          })
        }else{
            res.status(400).send({
                mess:"registration UNsuccessful",
                saved
            })
        }
    }catch(err){
        res.status(400).send({
            message: "Error in register controller",
            success: false,
            err,
          });
    }
}

const loginController=async (req,res)=>{
    try{
        const {email,password}=req.body

        const findmail=await user.findOne({email})
        if(!findmail){
            return res.status(403).send({
                success:false,
                message:"Invalid Email or Password!"
            })
        }
        //console.log("findmail="+findmail)
        //checking for correct passowrd and returning token
        const validPassword = await bcrypt.compareSync(password, findmail.password);
        if(!validPassword){ return res.status(402).send({
            success: false,
            message: "Invalid Password",
          })
        }else{
            let payload={
                id : findmail._id,
                email: findmail.email,
                name: findmail.name
                };
                //creating a jwt token with the help of jsonwebtoken package
                var token = jwt.sign(payload,process.env.SECRET);
                return  res.cookie("token",token,
                {
                httpOnly:true
                }).status(200).json({
                    success:true ,
                    message :"Login Successful" ,
                    id:findmail._id,
                    name:findmail.name,
                    email:findmail.email,
                    token:token
                    }) ;

          }
    }catch(err){
        //console.log(err)
    }
}

module.exports={registerController,loginController}
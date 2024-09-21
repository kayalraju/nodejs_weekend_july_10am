const { hashPassword, createToken, comparePassword } = require('../helper/authHelpre');
const userModel=require('../model/user')
const jwt=require('jsonwebtoken')

class AuthCuntroller{

    async register(req,res){
        try {
            const { name, email, password, mobile,first_school,role,city } = req.body;
                //validation
                if (!name) {
                    return res.send({ message: "Name is Required" });
                }
                if (!email) {
                    return res.send({ message: "Email is Required" });
                }
                if (!password) {
                    return res.send({ message: "Password is Required" });
                }
                if (!mobile) {
                    return res.send({ message: "Phone no is Required" });
                }
                if (!first_school) {
                    return res.send({ message: "First School is Required" });
                }
                //check user
                const exisitingUser = await userModel.findOne({ email });
                //exisiting user
                if (exisitingUser) {
                    return res.status(500).send({
                        success: false,
                        message: "Already Register this Email please login",
                        
                    });
                }
                //register user
                const hashedPassword = await hashPassword(password)
                //save
                const user =  new userModel({
                    name,
                    email,
                    mobile,
                    password: hashedPassword,
                    first_school,
                    role,
                    city
                })
              
               const userdata=await user.save()

                const tokendata = await createToken(userdata._id)
                return res.status(200).send({
                    status: true,
                    message: "User Register Successfully",
                    data: userdata,
                    token: tokendata
                });
            
          } catch (error) {
            res.status(500).send({
              status: false,
              message: "Erorr in getting Register",
              error: error.message,
            });
          }


    }


async login(req,res){
    try {
        const { email, password } = req.body;
            //validation
            if (!email || !password) {
                return res.status(500).send({
                    status: false,
                    message: "Invalid email or password",
                });
            }
            //check user
            const user = await userModel.findOne({ email });
            if (!user) {
                return res.status(500).send({
                    status: false,
                    message: "Email is not registerd",
                });
            }
            const match = await comparePassword(password, user.password);
            if (!match) {
                return res.status(500).send({
                    status: false,
                    message: "Invalid Password",
                });
            }
            const token = await jwt.sign({
                 _id: user._id,
                 name:user.name,
                 email:user.email,
                 mobile:user.mobile,
                 first_school:user.first_school,
                }, process.env.JWT_SECRET, { expiresIn: "12h" });
                return res.status(200).send({
                status: true,
                message: "login successfully",
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    image:user.image,
                    first_school:user.first_school,
                    role:user.role
                },
                token,
            });
      } catch (error) {
        res.status(500).send({
          status: false,
          message: "Erorr in getting Register",
          error: error.message,
        });
      }
    
}


async dashboard(req,res){
    res.status(200).json({
        meaasge:"welcome to user dashboard 👌"
    })
}


async updatePassword(req,res){

    try{
        const user_id=req.body.user_id
        const password=req.body.password
        const data=await userModel.findOne({_id:user_id})
        if(data){
            const newPassword=await hashPassword(password)
            const userData=await userModel.findByIdAndUpdate({_id:user_id},{
                $set:{
                    password:newPassword
                }
            })

            res.status(201).json({
                mesage:"password update successfully"
            })

        }else{
            res.status(201).json({
                mesage:"user not found"
            })
        }


    }catch(err){
        console.log(err);
        
    }
}


async forgetPassword(req,res){
    try{
        const{email,first_school,password}=req.body;
        if(!email){
           return res.status(500).send({message:"Email is required"})
        }
        if(!first_school){
            return  res.status(500).send({message:"school name is required"})
        }
        if(!password){
            return  res.status(500).send({message:"New Password is required"})
        }
        //check email exist or not
        const user=await userModel.findOne({email,first_school});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"wrong Email or school name"})
        }
        const heased=await hashPassword(password);
        await userModel.findByIdAndUpdate(user._id,{
            password:heased
        })
        return res.status(200).send({
            success:true,
            message:"Password Reset Successfully"})

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Errro in forget password",
            error,
        });
    }
}

}


module.exports=new AuthCuntroller()
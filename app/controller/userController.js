
const UserModel = require('../model/user')
const bcriypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
class userController{

   async Authuser(req, res, next)  {
        if (req.user) {
            console.log('after login user',req.user);
            next()
        } else {
            console.log( 'Error While Auth');
            res.redirect('/login')
        }
    }

    async registerView(req,res){
        res.render('register',{
            title:"register page"
        })
    }
    async loginView(req,res){
        res.render('login',{
            title:"login page"
        })
    }

    async register(req,res){
        console.log(req.body);
        
        try {
            const user = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: bcriypt.hashSync(req.body.password, bcriypt.genSaltSync(10))
            })
            const result = await user.save()
            if (result) {
                res.redirect('/login')
            } else {
               console.log('register failed');
               
                res.redirect('/register')
            }
    
        } catch (error) {
            console.log(error);
        }
       
    }



    async login(req,res){
        try {
            // Get user input
            const { email, password } = req.body;
    
            // Validate user input
            if (!(email && password)) {
                console.log('All input is required');
                return res.redirect('/login');
            }
            // Validate if user exist in our database
            const user = await UserModel.findOne({ email });
            if (!user) {
                console.log('Invalid Credential');
               return res.redirect('/login');
            }
    
            if (user && (await bcriypt.compare(password, user.password))) {
                // Create token
                const token = jwt.sign({
                    id: user._id,
                    name: user.name,
                    email: user.email
                }, "raju123456789652ssdff", { expiresIn: "50m" });
               
                if (token) {
                    res.cookie('userToken', token)
                    res.redirect('/userdashboard');
                } else {
                    console.log('login failed');
                }
            }
           
              return  res.redirect('/login');

        } catch (err) {
            console.log(err);
        }
    }




    async userDashboard(req,res){

        res.render('dashboard',{
            data:req.user
        })


    }



    async logout(req,res){
        res.clearCookie("userToken")
        return res.redirect('/login')
    }

}





module.exports=new userController();
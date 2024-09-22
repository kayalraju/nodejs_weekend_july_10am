const { postSchemavalidation } = require("../model/post")
const postRepo = require("../repositories/post.repo")


class PostController{

    async store(req,res){
        try{
            const {error,value}=await postSchemavalidation.validate(req.body)
            if(error){
                return res.status(400).json({
                    message:error.details[0].message
                })
            }else{
                const post=await postRepo.save(value)
                return res.status(201).json({
                    status:true,
                    data:post,
                    message:"data added"
                })
            }
           
            
        }catch(err){
            return res.status(500).json({
                message:'something went wrong'
            })
        }
    }

    async list(req,res){
        try{
            const allpost=await postRepo.find()
            return res.status(200).json({
                status:true,
                data:allpost,
                message:"data fetch successfully"
            })
        }catch(err){
            return res.status(500).json({
                message:'something went wrong'
            })
        }
    }


    //*********for ejs testing *********** */

    async index(req,res){
        try{
            const getallpost=await postRepo.find()
            res.render('postlist',{
                data:getallpost
            })

        }catch(error){
            console.log(error);
            
        }
    }
}


module.exports=new PostController()
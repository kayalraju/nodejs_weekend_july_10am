const {postModel}=require('../model/post')


class PostRepositories{

    async save(data){
        try{
            const newPost=await postModel.create(data)
            return newPost

        }catch(error){
            console.log(error);
            
        }

    }
    async find(){
        try{
            const Post=await postModel.find()
            return Post

        }catch(error){
            console.log(error);
            
        }

    }

}



module.exports=new PostRepositories()
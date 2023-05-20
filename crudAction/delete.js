import { TokenExpiresError } from "../Errors/tokenExpiresError.js"
import { TokenVerification } from "../TokenVerification.js"
import { posts } from "../index.js"

export const remove=async (req,res)=>{

    try{

        TokenVerification.dateVerification(req)

        const {id}=req.params
        const  response=await posts.deleteOne({_id:id})

        const {deletedCount}=response
        
        if(deletedCount>0)
        {
            return  res.send({message:"delete ok"})
        }else 
        {
            return  res.send({message:"Err: Element is no delete"})
        }

    }catch(error)
    {
        if(error instanceof TokenExpiresError){

            return  res.send({message:"token is expires"})
        }else
        {
            return  res.send({message:"Err: Element is no delete or invalide id "})
        }
    }

}
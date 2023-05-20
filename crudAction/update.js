import { ZodError, z } from "zod"
import { posts } from "../index.js"
import { TokenVerification } from "../TokenVerification.js"
import { TokenExpiresError } from "../Errors/tokenExpiresError.js"

export const update=async (req,res)=>{


    try{
        
        TokenVerification.dateVerification(req)
        const {id}=req.params
        const body=req.body

        const shema=z.object({
            name:z.string().min(2).optional(),
            message:z.string().min(2).optional(),
            tel:z.number().optional()
        })
    
        shema.parse(body)

        if(body!=={})
        {
            await posts.updateOne({_id:id},{"$set":body})
        } 

        res.headers({"Content-Type":"application/json"})
        const post=await posts.find({_id:id})
        return res.send(post)

    }catch(error)
    {
        console.log(error.message);

       if(error instanceof ZodError)
       {
         let msg=[];
         error.errors.forEach((el)=>{

            const {message,path}=el
            msg.push(`For key ${path[0]}, ${message} `)
         })
            
            return res.send({message:msg.join("; ")})

       }else if(error instanceof TokenExpiresError){

            return  res.send({message:"token is expires"})

       }else 
       {
            return res.send({message:"Invalide id"})
       }

    }
    
}
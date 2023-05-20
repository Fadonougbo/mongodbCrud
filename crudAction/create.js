import { ZodError, z } from "zod"
import { posts } from "../index.js"
import { TokenVerification } from "../TokenVerification.js"
import { TokenExpiresError } from "../Errors/tokenExpiresError.js"

export const create=async (req,res)=>{


    try 
    { 
      TokenVerification.dateVerification(req)

      const body=req.body
      const schema=z.object({
         name:z.string().min(2),
         message:z.string().min(2),
         tel:z.number().optional(),
         
      })

      schema.parse(body)
      
      await posts.insertMany([req.body])

      res.headers({"Content-Type":"application/json"})
      return  res.send(req.body)

    }catch(error)
    {

        //console.log(e.message);

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

       }else{
            return res.send({message:"Err: Value not add"})
       }

    }
    
}
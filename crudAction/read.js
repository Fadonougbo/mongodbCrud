import { TokenExpiresError } from "../Errors/tokenExpiresError.js"
import { TokenVerification } from "../TokenVerification.js"
import { fastify, posts } from "../index.js"

export const read=async (req,res)=>{

    try 
    {

        /* Pour générer un token 
        const date=new Date("2023-06-02T17:31:12.877Z").getTime()
        const token=fastify.jwt.sign({time:date})

        console.log(token); */

        TokenVerification.dateVerification(req)
        const post=await posts.find()
        return res.send(post)

    }catch(error)
    {
        if(error instanceof TokenExpiresError)
        {
          return  res.send({message:"token is expires"})

        }else
        {
            console.log(error.message);
            return res.send({message:"Error"})
        }
    }
    
    
}
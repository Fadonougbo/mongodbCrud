import { TokenExpiresError } from "./Errors/tokenExpiresError.js"


export class TokenVerification
{   
    /**
     * Verifie si le token est toujours valide
     * @param {*} req 
     */
    static  dateVerification(req)
    {
        const {time}=req.user

        const currentTime=Date.now()

        if(currentTime>time)
        {
            throw new TokenExpiresError()
        }

    }
}
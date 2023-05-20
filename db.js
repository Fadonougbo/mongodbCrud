import mongoose from "mongoose";

/**
 * 
 * @returns {Promise<mongoose>} mongoose instance
 */
export const dbConnection=async ()=>{

    try{
        
        mongoose.set('strictQuery', false);
        await mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`)

        return mongoose;

    }catch(e)
    {
        console.log(e.message);
    }
}




export const postCollection=(moongoseInstance)=>{
    
    const postSchemas=moongoseInstance.Schema(
        {
            name:{
                type:String,
                required:true
            },
            message:{
                type:String,
                required:true
            },
            tel:{
                type:Number
            }
        },
        {
            timestamps:true
        })

      return  moongoseInstance.model("posts",postSchemas)
}
/* eslint-disable @babel/new-cap */
import Fastify from "fastify";
import { read } from "./crudAction/read.js";
import { create } from "./crudAction/create.js";
import fastifyFormbody from "@fastify/formbody";
import fastifyJwt from "@fastify/jwt"
import { update } from "./crudAction/update.js";
import { remove } from "./crudAction/delete.js";
import { dbConnection } from "./db.js";
import { postCollection } from "./modeles/postCollection.js";

export const fastify=Fastify()

//plugin
fastify.register(fastifyFormbody)
fastify.register(fastifyJwt,{
    
    secret:process.env.JWT_SECRET
})

//posts collection
export const mongoose=await dbConnection()
export const posts=postCollection(mongoose)

//Verifie l'existance d'un token jwt

fastify.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send({token:"Token not found"})
    }
})

//route
fastify.get("/",read)

fastify.post("/post",create)

fastify.put("/update/:id",update)

fastify.delete("/delete/:id",remove)


try{

    await fastify.listen({port:8000})

}catch(e)
{
    console.log(e.message);
}
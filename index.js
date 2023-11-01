import express from 'express'

const server = express();

server.get('/',(req,res)=>{res.send("HELLO")})

server.listen(8080,()=>console.log(`Server running on port : 8080`))

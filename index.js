express = require("express");


const server=express();
const port = 8080;

server.user(express.json());

server.listen(port,()=>{
console.log('server running')
}

)

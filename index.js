express = require("express");
const postsRouter = require("./posts-router")

const server =express()
const port = 4000

server.use(express.json());
server.use(postsRouter);












server.listen(port,()=>{
console.log('server running')
}
)

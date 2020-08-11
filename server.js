const express = require("express")
const server = express()

const postsRouter = require('./data/posts-router')

server.use(express.json())

server.get('/', (req, res) => {
    const query = req.query
    console.log("query", query)
    res.status(200).json(query)
})

server.use("/api/posts", postsRouter)

module.exports = server
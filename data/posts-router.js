const express = require("express")
const Posts = require("./db")

const router = express.Router()

//post request

router.post('/', (req, res) => {
    const {title, contents} = req.body
    Posts.insert({title, contents})
    .then (id => {
        if (id){
        res.status(201).json(id)
        } else if (!title.id || !contents.id){
            res.status(400).json({errorMessage: "Please provide title and contents for the post."})
        }
    })
    .catch (err => {
        res.status(500).json({error: "There was an error while saving the post to the database"})
    })
})


// post with id and comments
router.post('/:id/comments', (req, res) => {
    Posts.insertComment(req.body)
    .then(post => {
        if (post){
        res.status(201).json(post)
        } else if (!post.id){
            res.status(404).json({message: "The post with the specified ID does not exist."})
        } else if (!post.text){
            res.status(400).json({errorMessage: "Please provide text for the comment."})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "There was an error while saving the comment to the database"})
    })
})

// get request
router.get('/', (req, res) => {
    Posts.find()
    .then((posts) => {
        res.status(200).json(posts)
    })
    .catch (err => {
        console.log(err)
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})


// get request by id
router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
        if (post){
            res.status(200).json(post)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "The post information could not be retrieved."})
    })
})


// get request by id/comments
router.get('/:id/comments', (req, res) => {
    Posts.findCommentById(req.params.id)
    .then(post => {
        if (post){
            res.status(200).json(post)
        } else if (!post.id){
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({error: "The comments information could not be retrieved."})
    })
})

// delete request
router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
    .then(post => {
        if (post){
        res.status(200).json(post)
        } else if (!post.id){
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(error => {
        res.status(500).json({error: "The post could not be removed"})
    })
    
})

//put request
router.put('/:id', (req, res) => {
    Posts.update(req.params.id, req.body)
    .then(post => {
        if (post){
            res.status(200).json(post)
        } else if (!post.id){
            res.status(404).json({message: "The post with the specified ID does not exist."})
        } else if (!post.title || !post.contents){
            res.status(400).json({errorMessage: "Please provide title and contents for the post."})
        }
    })
    .catch(error => {
        res.status(500).json({error: "The post information could not be modified."})
    })
})

module.exports = router
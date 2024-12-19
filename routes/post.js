const express =require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../verifyToken')

// POST (Create data)
router.post('/', verifyToken, async(req,res) =>{
    //console.log(req.body)

    const postData = new Post({
        userId:req.body.userId,
        title:req.body.title,
        topic:req.body.topic,
        caption:req.body.caption,
        hashtags:req.body.hashtags,
        location:req.body.location,
        imageUrl:req.body.imageUrl,
        likes:req.body.likes,
        dislikes:req.body.dislikes,
        comments:req.body.comments

    })
    // try to insert...
    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }
})

// GET 1 (Read all)
router.get('/', verifyToken, async(req,res) =>{
    try{
        const topic = req.query.topic
        let getPosts;
        if (topic){
            getPosts = await Post.find({ topic: { $in: [topic] } })
        } else {
            getPosts = await Post.find()
        }

        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
})


// GET 2 (Read by ID)
router.get('/:postId', verifyToken, async(req,res) =>{
    try{
        const getPostById = await Post.findById(req.params.postId)
        res.send(getPostById)
    }catch(err){
        res.send({message:err})
    }
})




// PATCH (Update)
router.patch('/:postId', verifyToken, async(req,res) =>{
    try{
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                userId:req.body.user,
                title:req.body.title,
                topic:req.body.topic,
                text:req.body.text,
                hashtag:req.body.hashtag,
                location:req.body.location,
                imageUrl:req.body.imageUrl,
                likes:req.body.likes,
                dislikes:req.body.dislikes,
                comments:req.body.comments
                }
            })
        res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})


// like
router.patch('/:postId/like/:userId', verifyToken, async(req,res) =>{
    try{
        const userId = req.params.userId
        const post = await Post.findOne({_id:req.params.postId})
        const likes = post.likes
        likes.push(userId)
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                likes
                }
            })
        res.send(updatePostById)
    }catch(err){
        console.log(err)
        res.send({message:err})
    }
})

// dislike
router.patch('/:postId/dislikes/:userId', verifyToken, async(req,res) =>{
    try{
        const userId = req.params.userId
        const post = await Post.findOne({_id:req.params.postId})
        const dislikes = post.dislikes
        dislikes.push(userId)
        const updatePostById = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                dislikes
                }
            })
        res.send(updatePostById)
    }catch(err){
        console.log(err)
        res.send({message:err})
    }
})





// DELETE (Delete)
router.delete('/:postId', verifyToken, async(req,res) =>{
    try{
        const deletePostById = await Post.deleteOne({_id:req.params.postId})
        res.send(deletePostById)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router
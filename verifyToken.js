const { send } = require('express/lib/response')
const jsonwebtoken = require('jsonwebtoken')

function auth(req,res,next){
    const token = req.header('Authorization')
    if(!token){
        return res.status(401).send({message:'User is not authorised'})
    }
    try{
        const verified = jsonwebtoken.verify(token,process.env.TOKEN_SECRET)
        req.user=verified
        next()
    }catch(err){
        return res.status(401).send({message:'Invalid token'})
    }
}

module.exports=auth
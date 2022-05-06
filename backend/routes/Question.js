const express = require('express')
const router = express.Router()

const questionDB = require('../models/Question')

router.delete('/:_id', async (req,res) => {
    await questionDB.deleteOne({_id:req.params.id})
    .then(() => {
        res.status(200).json({  
            message: "Question deleted successfully..."
        })
    })
})  

router.post('/', async (req,res) =>{
    console.log(req.body)

    try{
        await questionDB.create({
            questionName: req.body.questionName,
            questionUrl: req.body.questionUrl,
            user:  req.body.user
        }).then(() => {
            res.status(201).send({
                status: true,
                message: "Question added successfully"  
            })
        })
    }catch (e){
        res.status(500).send({
            status:false,
            message:"Error while adding question"
        })
    }
})


router.get('/', async (req,res) =>{
    try{
        await questionDB.aggregate([
            {
                $lookup: {
                    from: "answers",
                    localField:"_id",
                    foreignField:"questionId",
                    as:"allAnswers"
                }
            }
        ]).exec().then((doc) => {
            res.status(200).send(doc)
        }).catch((error) => {
            res.status(500).send({
                status: false,
                message:"Enable to get the question details"
            })
        })
    }catch(e){
        res.status(500).send({
            status: false,
            message:"Unexpected error"
        })
    }
})

module.exports = router
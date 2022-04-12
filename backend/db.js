const mongoose = require('mongoose')
const url = "mongodb://chirayu21:Chirayu100@cluster0-shard-00-00.tl499.mongodb.net:27017,cluster0-shard-00-01.tl499.mongodb.net:27017,cluster0-shard-00-02.tl499.mongodb.net:27017/quora-clone?ssl=true&replicaSet=atlas-27kmxm-shard-0&authSource=admin&retryWrites=true&w=majority" ;

module.exports.connect = ()=>{
    mongoose.connect(url,{
        useNewUrlParser : true,
        
    }).then(() =>{
        console.log('Mongodb connected succcessfully to the DataBase')
    }).catch((error) =>{
        console.log("Error: ", error)
    })
}
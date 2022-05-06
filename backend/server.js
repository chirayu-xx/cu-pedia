
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 80;
const db = require('./db');
const router = require('./routes')


//Connecting to database
db.connect();

app.use(bodyParser.json({limit: "50mb" }))
app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}))

app.use((req,res, next) =>{
    req.header("Access-Control-Allow-Origin", "*")
    req.header("Access-Control-Allow-Headers", "*")
    next()
})

app.use("/api", router);
app.use('/uploads', express.static(path.join(__dirname,"/../uploads")))
app.use('/uploads', express.static(path.join(__dirname,"/../frontend/build")))
//routes


app.get("*", (req,res) =>{
    try{
        res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))
    }catch (e){
        res.send("Cannot get what you want, We are Sorry!!")
    }
})

app.use(cors())

if(process.env.NODE_ENV == "production"){
    app.use(express.static("frontend/build"));
}

//serverListening
app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening on port number ${PORT}`)
})

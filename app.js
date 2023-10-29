const express  = require('express');
const app = express();
const database=require('./database');
const Form=require('./modal');
const fileupload = require("express-fileupload");
const path = require('path');
const cors  = require('cors')


require('dotenv').config({path:'.env'});
app.use(cors());
app.use(express.json());
app.use(fileupload());

app.get('/get',async (req,res)=>{
     const data  = await Form.find();
     res.status(200).json({
        data
     })
})


function uploadFile(filePath, file) {
    return new Promise((resolve, reject) => {
      file.mv(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
      setTimeout(() => {
        resolve();
      }, [200]);
    });
}

app.post('/add',async (req,res)=>{
    console.log(req.body)
     const {uen,cname,name,position,email,mobile}=req.body;
     const fileName = Date.now() + "" + req.files.files.name;
     const file = req.files.files;
     const filePath = path.join(__dirname, ".", "files", `${fileName}`);
     await uploadFile(filePath, file);
    
     const data = await Form.create({
        uen,
        cname,
        name,
        position,
        email,
        mobile,
        file:filePath
     })
     res.status(200).json({
        message:"successfully added",
        data
     })
})


const con=database();
con.then((message)=>{
    console.log(message);
    app.listen(8000,()=>{
        console.log('server is running on port 8000')
    })
}).catch((message)=>{
    console.log(message);
})

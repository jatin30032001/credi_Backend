const mongoose =require('mongoose');

const Database=()=>{
    return new Promise(async (resolve,reject)=>{
       await mongoose.connect(process.env.Database_URL,{
            useNewURLParser:true,useUnifiedTopology:true
       }).then((data)=>{
           resolve('Database connnected successfully');
       }).catch((e)=>{
           console.log(e)
           reject('Database Connection failed');
       })
    }); 
};

module.exports= Database;
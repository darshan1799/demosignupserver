const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://darshan:sutariya@cluster0.gnk8gbc.mongodb.net/Signupdata?retryWrites=true&w=majority&appName=Cluster0").then(()=>
{
    console.log("Database Connected Sucessfully");
});


const SignupSchema =new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    username:
    {
        type:String,
        required:true
    }
});

const SignupModel = mongoose.model("dataofuser",SignupSchema);
module.exports = SignupModel;
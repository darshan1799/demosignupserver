const express = require('express');
const App = express();
const SignupModel = require('./SignUpSchema');
require('dotenv');

App.use(express.json());

App.post('/postdata',async(req,res)=>
{
    let CheckExistUser =await SignupModel.find({username:req.body.username});  
    let CheckExistEmail =await SignupModel.find({email:req.body.email});
   if(String(CheckExistEmail) != "")
   {
     res.status(409).send("This Email Already Exist Try Another Email");
   }
   else if(String(CheckExistUser) != "")
   {
    res.status(409).send("This Username Already Exist Try Another Username");
   }
   else
   {
    let AddData = new SignupModel(req.body);
    AddData =await AddData.save();
    res.status(200).send(AddData);
   }
});

App.listen(process.env.PORT || 2000,()=>
{
    console.log(`Server Stared On ${PORT}`);
});
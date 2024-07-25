const express = require('express');
const App = express();
const SignupModel = require('./SignUpSchema');
require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcrypt');

// CORS is like a security gate for websites. It controls which other websites can get information from your site. If you want your site to share data with another site, you need to give that site permission through special settings.

App.use(express.json());
App.use(cors({ origin: 'http://localhost:5173' }));

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
   req.body.password = await bcrypt.hash(req.body.password,Number(process.env.SALT));
    let AddData = new SignupModel(req.body);
    AddData =await AddData.save();
    res.status(200).send(AddData);
   }
});

App.listen(process.env.PORT || 2000,()=>
{
    console.log(`Server Stared On ${process.env.PORT}`);
});
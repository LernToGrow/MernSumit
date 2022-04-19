const express = require("express");
const router = express.Router();
require("../db/conn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
// require("../config.env")

router.get("/",(req,res)=>{
    res.send("hello world from the router server");
})


// router.post("/register",(req,res)=>{
//     // console.log(req.body);
//     // res.json({message:req.body});
//     // // res.send("mera register opage");
//     const {name, email , phone, work, password, cpassword} = req.body;

//     if(!name || !email  || !phone || !work || !password || !cpassword){
//         return res.status(422).json({errr :"Plz fill the All property"})
//     }

//     User.findOne({email:email})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({errr :"Email already exists"})

//         }
//         const user = new User({name, email , phone, work, password, cpassword});

//         user.save().then(()=>{
//             res.status(201).json({messsage:"user registerd succesfully"});
//         }).catch((err)=>{
//             res.status(500).json({error:"failed to register"});
//         })
//     }).catch(err=>{console.log(err)})
// });



//////using async await 

router.post("/register", async(req,res)=>{
    // console.log(req.body);
    // res.json({message:req.body});
    // // res.send("mera register opage");
    const {name, email , phone, work, password, cpassword} = req.body;
    if(!name || !email  || !phone || !work || !password || !cpassword){
        return res.status(422).json({errr :"Plz fill the All property"})
    }
    try{  
        const userExist = await User.findOne({email:email})
        if(userExist){
            return res.status(422).json({errr :"Email already exists"})
        }else if(password != cpassword){
            return res.status(422).json({errr :"password are not matching"})
        }
        const user = new User({name, email , phone, work, password, cpassword});
        await user.save();
        res.status(201).json({messsage:"user registerd succesfully"});
    }catch(err){
        console.log(err);
    }
});

// ////login gate 
 router.post("/signin",async(req,res)=>{
    // console.log(req.body);
    // res.json({message:"Awesome"})
    try{
        let token;
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"plz fill the data"})
        }
        const userLogin = await User.findOne({email:email});
        if(userLogin){
            token = await userLogin.generateAuthToken();
            console.log("hi i am token",token);
            if(!password === userLogin.password){
                res.status(400).json({error:"Invalid Credientials pass"});
            }else{
                res.json({message:"User SignIn Successfully"});
            }
        }else{
            res.status(400).json({error:"Invalid Credientials email"});
        }





// //user login using bcryptjs
//     try{
//         if(userLogin){
//             const isMatch = await bcrypt.compare(password, userLogin.password);
//             if(!isMatch){
//                 res.status(400).json({error:"Invalid Credientials passs"});
//             }else{
//             res.json({message:"User SignIn Successfully"});
//         }
//         //  console.log(userLogin);
//         }else{
//             res.json({error:"Invalid Credientials"});
//         }
//     //this becript part end here 
    }catch(err){
        console.log(err);
    }
})












router.get("/about",(req,res)=>{
    res.send("hello world from the about  router server");
})
router.get("/contact",(req,res)=>{
    res.send("hello world from the contact server");
})
router.get("/signin",(req,res)=>{
    res.send("hello world from the signin server");
})
router.get("/signup",(req,res)=>{
    res.send("hello world from the signup server");
})

module.exports = router;
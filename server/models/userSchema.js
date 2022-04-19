const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("../.env")


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
    },
    work:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})

userSchema.pre('save', async function(next){
    console.log("hi from inside");
    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password ,12);
        this.cpassword = bcrypt.hash(this.cpassword ,12);
    }
    next();
})


userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},);
        this.tokens = this.tokens.concat({token:token},process.env.SECRATEKEY);
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}


const User = mongoose.model("USER",userSchema);

module.exports = User;



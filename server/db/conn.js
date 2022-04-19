const mongoose = require("mongoose");
// const DATABASE =require("../config.env")
const DB=`mongodb+srv://root:root@cluster0.sucjt.mongodb.net/mernstack?retryWrites=true&w=majority`;
// const DB=DATABASE;
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useUnifiedTopology: true,
    //useFindAndModify:false
}).then(()=>{
    console.log("conection  succensfull");
}).catch(()=>{
    console.log("no connection");
})
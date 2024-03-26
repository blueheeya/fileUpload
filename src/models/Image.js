const { default: mongoose } = require("mongoose");

const ImageSchema = mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    // filename: {type:String,required:true},
    // originalFileName:{type:String,required:true} //images로 합체!
    images:[
        {
         originalFileName:{type:String,required:true},
         filename:{type:String,required:true}
        }    
    ]
},{timestemps:true})
const Image =mongoose .model("image", ImageSchema);
module.exports ={Image};
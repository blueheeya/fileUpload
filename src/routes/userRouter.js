// const {Router} = require("express");
const {User} = require("../models/User");
const express = require("express");
const userRouter = express.Router();
const {hash,compare} = require("bcryptjs");
const { upload } = require("../middlewares/imageUpload");

userRouter.get("/member", async function(req,res){
    try {
        const users = await User.find({});
        return res.send({users});
    } catch(error) {
        return res.status(500).send({error:error.message});
    }   
});

// userRouter.get("/:userId",async function(req,res){
//     try {
//         const {userId} = req.params;
//         const user = await User.findOne({_id: userId});
//         return res.send({user}); 
//     } catch(error) {
//         return res.status(500).send({error:error.message});
//     }
// })
userRouter.post("/reg", async function(req,res){
    try {
        const password = await hash(req.body.password,10);
        console.log(password);
    //    const user = new User(req.body);
    //    await user.save();
       const user = await new User({...req.body,password}).save(); //한 줄로 요약 
       return res.send({user}); 
    } catch(error) {
        return res.status(500).send({error:error.message});
    }
});
//로그인
userRouter.post("/login", async function(req,res){
    try{
        // console.log(req.body);
        const user = await User.findOne({useremail:req.body.useremail})
        const isValid = await compare(req.body.password,user.password);
        if(!isValid) {
           return res.status(400).send({error:"입력하신 정보가 올바르지 않습니다."})
        }
        console.log(isValid);
        return res.send({message:"로그인이 되었습니다.", email:user.useremail});
    }catch(error) {
        return res.status(500).send({error:error.message});
    }
})
userRouter.put("/reg_modi/:userId",upload.single("avatar"),async function(req,res){
    try {
        const userId = req.params.userId;
        const {username} = req.body;
        const {filename,originalname} = req.file;
        const image = {filename,originalname}
        const update = await User.findOneAndUpdate(
            {_id:userId},
            {username,image},
            {new:true}
        );
        return res.send({update});
    }catch(error) {
        return res.status(500).send({error:error.message});
    }
})
// userRouter.put("/reg/:userId", upload.single("image"), async function(req,res){
//     try {
//       const {userId} = req.params;
//       const user = await User.findByIdAndUpdate(
//         {
//         filename:req.file.filename,
//         originalFileName:req.file.originalname,
//         // title:req.file.title
//         },{new:true}
//       ).save()
//       return res.send({user});
//         // return res.send({user});
//     } catch(error) {
//         return res.status(500).send({error:error.message});
//     }
// });
// userRouter.delete("/", async function(req,res){
//     try {
        
//     } catch(error) {
//         return res.status(500).send({error:error.message});
//     }
// });


module.exports = {userRouter};
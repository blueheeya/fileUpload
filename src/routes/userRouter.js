const {Router} = require("express");
const userRouter = Router();
const {User} = require("../models/User");
const {upload} = require("../middlewares/imageUpload");
const {Image} = require("../models/Image")

userRouter.get("/", async function(req,res){
    try {
        const users = await User.find({});
        return res.send({users});
    } catch(error) {
        return res.status(500).send({error:error.message});
    }   
});

userRouter.get("/:userId",async function(req,res){
    try {
        const {userId} = req.params;
        const user = await User.findOne({_id: userId});
        return res.send({user}); 
    } catch(error) {
        return res.status(500).send({error:error.message});
    }

})
userRouter.post("/", async function(req,res){
    try {
       const user = new User(req.body);
       await user.save();
       res.send({user});
    //const user = await new User(req.body).save(); //한 줄로 요약 
    } catch(error) {
        return res.status(500).send({error:error.message});
    }
});
userRouter.put("/:userId", upload.single("image"), async function(req,res){
    try {
      const {userId} = req.params;
      const user = await User.findByIdAndUpdate(
        {
        filename:req.file.filename,
        originalFileName:req.file.originalname,
        // title:req.file.title
        },{new:true}
      ).save()
      return res.send({user});
        // return res.send({user});
    } catch(error) {
        return res.status(500).send({error:error.message});
    }
});
// userRouter.delete("/", async function(req,res){
//     try {
        
//     } catch(error) {
//         return res.status(500).send({error:error.message});
//     }
// });


module.exports = {userRouter};
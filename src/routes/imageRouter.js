const {Router} = require("express");
const imageRouter = Router();
const {upload} = require("../middlewares/imageUpload")
const {Image} = require("../models/Image")

imageRouter.post("/", upload.array("images",5), async function (req, res) {
    try {
      console.log(req.files);
    //   const {title} = req.body

    //single file
    //   const image = await new Image({
    //     filename:req.file.filename,
    //     originalFileName:req.file.originalname,
    //     title:req.file.title
    //   }).save()
    //   return res.send({image});


    //multi file
    const {title,content} = req.body;
    const images = [];
    req.files.forEach(function(item){
        images.push({
            originalFileName:item.originalname,
            filename:item.filename
        })
    });

    const image = await new Image({
        // title:title,content:content,images:images
        ...req.body,images //딥카피
    }).save()
    console.log(images)
    return res.send({image});
    } catch (error) {
      return res.status(500).send({error: error.message});
    }
  });

  module.exports = {imageRouter};
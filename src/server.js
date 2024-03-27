const express = require("express");
const {default: mongoose} = require("mongoose");
const app = express();
const dotenv = require("dotenv");
//imgeUpload로 빼냄 
// const multer = require("multer");
// const {v4: uuid} = require("uuid");
// const mime = require("mime-types");
// const {upload} = require("./middlewares/imageUpload"); //image Router로 빼냄
const { imageRouter } = require("./routes/imageRouter");
const { userRouter } = require("./routes/userRouter");


dotenv.config();

//app.use( express.static("uploads"));
//http://localhost:3000/abc.jpeg
app.use("/uploads", express.static("uploads"));
//http://localhost:3000/uploads/abc.jpeg

const server = async function () {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("db연결됨");
      app.use(express.json());
      app.use("/upload",imageRouter);
      app.use("/user",userRouter);
      
  
      app.listen(3000);
    } catch (error) {
      console.log("연결안됨");
    }
  };
  server();
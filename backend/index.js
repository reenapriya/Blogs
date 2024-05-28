// require ("dotenv").config()
// const express=require("express")
// const  fs = require('fs')
// const morgan = require('morgan')
// const path = require('path')
// const {chechSchema, checkSchema}=require("express-validator")
// const {userRegisterValidation,userLoginValidation,userUpdateValidation}=require("./app/validation/user-validation")
// const authenticateUser=require("./app/middleware/authenticateUser")
// const configurationDb=require("./configure/db")
// const userCtrl=require("./app/controller/user-ctrl")
// const cors=require("cors")
// const helmet=require("helmet")
// const multer = require('multer')
// const app=express()
// app.use(cors())
// app.use(helmet())
// app.use(express.json())
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms' /* 'common '*/, {
//     stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
//   }))
// configurationDb()
// const port=4444
// const staticpath = path.join(__dirname,'/images')
// app.use('/images',express.static(staticpath))

// const storage = multer.diskStorage({
//   destination: (req,file,cb)=>{
//       cb(null,"images")
//   },
//   filename:(req,file,cb)=>{
//       console.log(file)
//       cb(null, Date.now() + path.extname(file.originalname))
//   }
// })
// const upload = multer({storage:storage})


// //users-api
// app.post("/api/users/register",upload.single('profilePic'),checkSchema(userRegisterValidation),userCtrl.register)
// app.post("/api/users/login",checkSchema(userLoginValidation),userCtrl.login)
// app.get("/api/users/account",authenticateUser,userCtrl.account)
// app.put("/api/users/update",authenticateUser,checkSchema(userUpdateValidation),userCtrl.update)
// app.listen(port,()=>{
//     console.log("successfully connect to portal")
// })
require("dotenv").config();
const express = require("express");
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const { checkSchema } = require("express-validator");
const { userRegisterValidation, userLoginValidation, userUpdateValidation } = require("./app/validation/user-validation");
const postValidation=require("./app/validation/post-validation")
const commentValidation=require("./app/validation/comment-validation")
const authenticateUser = require("./app/middleware/authenticateUser");
const configurationDb = require("./configure/db");
const userCtrl = require("./app/controller/user-ctrl");
const postCtrl=require("./app/controller/post-ctrl")
const commentCtrl=require("./app/controller/comment-ctrl")
const upload = require('./app/middleware/uploads')
const cors = require("cors");
const helmet = require("helmet");
const multer = require('multer');

const app = express();
const port = 4444;

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(express.json());


// Morgan logging setup
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: accessLogStream }));

//Ensure the upload directory exists
// const uploadDir = path.join(__dirname, 'images');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

// Static file serving

//Multer setup for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, uploadDir);
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + path.extname(file.originalname));     }
//  });
//  const upload = multer({ storage: storage });


 app.use('/images', express.static(path.join(__dirname,"uploads")));


// Static file serving
//app.use('/images', express.static(uploadDir));

// Database configuration
configurationDb();

// User routes
app.post("/api/users/register", upload.single('profilePic'), checkSchema(userRegisterValidation), userCtrl.register);
app.post("/api/users/login", checkSchema(userLoginValidation), userCtrl.login);
app.get("/api/users/account", authenticateUser, userCtrl.account);
app.put("/api/users/update", upload.single("profilePic"),authenticateUser, checkSchema(userUpdateValidation), userCtrl.update);

//post routes
app.post("/api/posts/create",upload.array("postImage","5"),authenticateUser,checkSchema(postValidation),postCtrl.create)
app.get("/api/posts/showAll",postCtrl.retrieve)
app.get("/api/posts/showOne/:PostId",postCtrl.retrieveOne)
app.put("/api/posts/update/:id",authenticateUser,postCtrl.update)
app.delete("/api/posts/delete/:id",authenticateUser,postCtrl.delete)
app.get("/api/posts/mypost",authenticateUser,postCtrl.mypost)

//comment routes
app.post("/api/comments/:id/create",authenticateUser,checkSchema(commentValidation),commentCtrl.create)
app.get("/api/comments/:id/show",commentCtrl.get)
app.put("/api/comments/:id/update/:commentId",authenticateUser,commentCtrl.update)
app.delete("/api/comments/:id/delete/:commentId",authenticateUser,commentCtrl.delete)



// Start the server
app.listen(port, () => {
    console.log(`Server successfully connected to port ${port}`);
});

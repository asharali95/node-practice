const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const {promisify} = require("util");

var signJWT = (userId) =>{
  return JWT.sign({id: userId},process.env.WEB_SECRET,{expiresIn: process.env.JWT_EXPIRES_IN});
}

exports.protect = async (req,res,next) =>{
  console.log("hello from protect middleware");
  // 1- fetch token from request.headers
  var token = null;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    token = req.headers.authorization.split(" ")[1];
  }
  // 2- if token exists
  if(!token){
    return res.status(401).json({
      status:"error",
      message:"please sign in"
    })
  }
  // 3- verify JWT
  var {id: userId} = await promisify(JWT.verify)(token, process.env.WEB_SECRET)
  console.log(userId)
  // 4- check if user exists in DB
  var user = await User.findById(userId);
  
  if(!user){
    return res.status(401).json({
      status:"error",
      message:"user doesnt exist!"
    })
  }
  // if email matches with token's email
  if(req.body.email !== user.email){
    return res.status(401).json({
      status:"error",
      message:"you are not authorized to use this api"
    })
  }
next();
}

exports.addProduct = (req,res) =>{
  try {
    res.status(200).json({
      status:"successs",
      message:"this is a private api"
    })
  } catch (error) {
    res.status(400).json({
      message:error.message
    })
  }
}

exports.signup = async(req,res) =>{
  try {
    const user = await User.create(req.body)
    var token = signJWT(user._id);
    res.status(200).json({
      status:"success",
      token,
      data: {
        user
      }
    })
  } catch (error) {
    res.status(400).json({
      message:error.message
    })
  }
}
exports.login =async(req,res) =>{
  try {
    var {email,password} = req.body
    //1.check if email and password exists
    if(!email || !password){
      return res.status(401).json({
        error:"Please enter email and password"
      })
    }

    //2.get email
    var user = await User.findOne({email}).select("+password")

    
    //3.password should match
    var ecryptedPassword = await bcrypt.compare(password,user.password);
    
    
    //4.encrypted pass should match entered password
    if(!password ===ecryptedPassword){
      return res.status(401).json({
        error:"you entered wrong email and password"
      })
    }
    var token = signJWT(user._id);

    res.status(200).json({
      status:"success",
      token,
      data:{
        user
      }
    })
  } catch (error) {
    res.status(400).json({
      message:error.message
    })
  }
}













// exports.postUsers = async (req, res) => {
//     try {
//       var data = req.body;
//       const user = await User.create(data);
//       res.status(200).json({
//         message: "success",
//         data: {
//           user,
//         },
//       });
//     } catch (error) {
//       res.status(400).json({
//         message: error.message,
//       });
//     }
//   }

// exports.getAllusers = async (req, res) => {
//     try {
//       const allUsers = await User.find();
//       res.status(200).json({
//         message: "success",
//         data: {
//           allUsers,
//         },
//       });
//     } catch (error) {
//       res.status(400).json({
//         message: error.message,
//       });
//     }
//   }

// exports.getSpecificUser = async (req, res) => {
//     try {
//       console.log(req.params.userId);
//       const specificUser = await User.findById(req.params.userId);
//       res.status(200).json({
//         message: "success",
//         data: {
//           specificUser,
//         },
//       });
//     } catch (error) {
//       res.status(400).json({
//         message: error.message,
//       });
//     }
//   }
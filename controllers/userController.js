const User = require("../model/userModel");
const bcrypt = require("bcryptjs");

exports.signup = async(req,res) =>{
  try {
    const user = await User.create(req.body)
    console.log(token);
    res.status(200).json({
      status:"success",
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

    res.status(200).json({
      status:"success",
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
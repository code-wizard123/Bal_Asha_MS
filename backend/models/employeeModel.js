const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const crypto=require("crypto");
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    // validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },
  role: {
    type: Number,
    required:true
    // default: "employee",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  pincode: {
    type: Number,
    required: true,
  },
  child: [{ type: mongoose.Schema.ObjectId, ref: "Child" }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

employeeSchema.pre("save",  async function(next){
  if(!this.isModified("password"))
  {
    next();
  }
  this.password=await bcrypt.hash(this.password,10)
});
// JWT Token
employeeSchema.methods.getJWTToken=function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE,
  });
};

employeeSchema.methods.comparePassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}

employeeSchema.methods.getResetPasswordToken=function(){
  const resetToken=crypto.randomBytes(20).toString("hex");

  //Hashing and adding reset password into employeeSchema
  this.resetPasswordToken=crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

  this.resetPasswordExpire=Date.now()+15*60*1000;
  
  return resetToken;
}
module.exports = mongoose.model("Employee", employeeSchema);
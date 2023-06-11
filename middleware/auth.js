const errorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt=require("jsonwebtoken");
const Employee=require('../models/employeeModel');

exports.isAuthenticatedEmployee=catchAsyncErrors(async (req,res,next)=>{
    const {token}=req.cookies;
    if(!token)
    {
    return next(new errorHandler("Please login to access this resource"));
    }
    const decodedData=jwt.verify(token,process.env.JWT_SECRET);
    req.employee=await Employee.findById(decodedData.id);
    next();
});

exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role))
        {
            return next(new errorHandler(`Role : ${req.user.role} is not allowed to access this resource`,403));
        }
        next();
    };
};

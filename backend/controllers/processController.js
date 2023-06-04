const Employee = require("../models/employeeModel");
const Child = require('../models/childModel');
const Process=require('../models/processModel');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

//Register Employee
// exports.register=catchAsyncErrors(async(req,res,next)=>{
//     const  { name, email, password, pinCode, phoneNo, photo } = req.body;
//     const employee = await Employee.create({
//         name, email, password, pinCode, phoneNo, photo,
//         avatar:{
//             public_id:"this is a sample id",
//             url:"profilepicUrl"
//         },
//     });
//     sendToken(employee,201,res);
// });

//Login Employee
// exports.loginEmployee=catchAsyncErrors(async (req,res,next)=>{
//     const {email,password}=req.body;
//     if(!email||!password)
//     {
//         return next(new errorHandler("Please Enter Email and password",400))
//     }
//     const employee = await Employee.findOne({email}).select("+password");
//     if(!employee)
//     {
//         return next(new errorHandler("Invalid email or Password",401));
//     }
//     const isPasswordMatched=await employee.comparePassword(password);

//     if(!isPasswordMatched)
//     {
//         return next(new errorHandler("Invalid email or Password",401));
//     }
//    sendToken(employee,200,res);
// })

// //Create New Process
exports.newProcess = catchAsyncErrors(async (req, res, next) => {
    const { child, DateofAdmission, enrollmentDate } = req.body;
    const process = await Process.create({ child, DateofAdmission, enrollmentDate });
  
    res.status(201).json({
      success: true,
      process
    });
  });
  
  

// exports.getSingleProcess = catchAsyncErrors(async (req, res, next) => {
//     const process=await Process.findById(req.params.id).populate("employee","name email");
//     if(!process)
//     {
//         return next(new errorHandler("Process not found with this Id",404));
//     }
//     res.status(200).json({
//         success: true,
//         process
//     });
// });

// //get logged in child processs
exports.myProcess = catchAsyncErrors(async (req, res, next) => {
    const { child } = req.body;
    const childId = child._id; // Access the child ID from the request body
  
    const process = await Process.find({ child: childId });
    res.status(200).json({
      success: true,
      process
    });
  });
  

// //get all  processs (admin)
// exports.getAllProcesss = catchAsyncErrors(async (req, res, next) => {
//     const processs=await Process.find();

//     let totalAmount=0;
//     processs.forEach((process)=>{
//         totalAmount+=process.totalPrice;
//     });
//     res.status(200).json({
//         success: true,
//         totalAmount,
//         processs
//     });
// });


// exports.updateProcess = catchAsyncErrors(async (req, res, next) => {
//     const process=await Process.findById(req.params.id);
//     if(process.processStatus==="Delivered")
//     {
//         return next(new errorHandler("You have already received this process",404));
//     }
//     process.processItems.forEach(async (process)=>{
//         await updateStock(process.child,process.quantity);
//     })
//     process.processStatus=req.body.status;
//     if(req.body.status==="Delivered")
//     {
//     process.deliveredAt=Date.now();
//     }
//     await process.save({runValidatorsBeforeSave:false});
    
//     res.status(200).json({
//         success: true,
//         process
//     });
// });

// async function updateStock(id,quantity)
// {
//     const child= await Child.findById(id);
//     child.stock-=quantity;
//     await child.save({runValidatorsBeforeSave:false});

// }

// exports.deleteProcess = catchAsyncErrors(async (req, res, next) => {
//     const process=await Process.findById(req.params.id);
//     if(!process)
//     {
//         return next(new errorHandler("Process not found with this Id",404));
//     }
//     await process.remove();
    
//     res.status(200).json({
//         success: true,
//         process
//     });
// });
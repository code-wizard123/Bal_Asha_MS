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
exports.getAllProcess = catchAsyncErrors(async (req, res, next) => {
    const process=await Process.find();

    res.status(200).json({
        success: true,
        process
    });
});



// Update the process with new parameters
exports.updateProcess = catchAsyncErrors(async (req, res, next) => {
  const process = await Process.findById(req.params.id);

  // Update the parameters with new values
  process.DateofAdmission = req.body.DateofAdmission;
  process.enrollmentDate = req.body.enrollmentDate;
  process.photoPublication1 = req.body.photoPublication1;
  process.photoPublication2 = req.body.photoPublication2;
  process.tvTelecasting = req.body.tvTelecasting;
  process.policeReport = req.body.policeReport;
  process.previousOrgReport = req.body.previousOrgReport;
  process.finalReport = req.body.finalReport;
  process.FreeForAdoptionDate = req.body.FreeForAdoptionDate;
  process.MER = req.body.MER;
  process.CSR = req.body.CSR;
  process.CaringsUpload = req.body.CaringsUpload;
  process.lastVisitByFamily = req.body.lastVisitByFamily;

  // Push the updated parameters in the "ActionDone" array
  const updatedParameters = Object.keys(req.body);
  process.ActionDone.push(...updatedParameters);

  await process.save({ runValidatorsBeforeSave: false });

  res.status(200).json({
    success: true,
    process
  });
});


exports.deleteProcess = catchAsyncErrors(async (req, res, next) => {
    const process=await Process.findById(req.params.id);
    if(!process)
    {
        return next(new errorHandler("Process not found with this Id",404));
    }
    await Process.deleteOne({ _id: req.params.id });
    
    res.status(200).json({
        success: true,
        process
    });
});
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
  
  // Retrieve the child and its actionLeft attribute
  const childObj = await Child.findById(child);
  const actionLeft = childObj.actionLeft;
  // console.log(actionLeft);
  
  // Create a new process with the retrieved actionLeft attribute
  const process = await Process.create({ child, DateofAdmission, enrollmentDate, actionLeft });

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

  // Update the parameters with new values if they exist in ActionLeft or ActionDone
  const allowedAttributes = [...process.ActionDone, ...process.actionLeft];
  const updateParams = Object.keys(req.body).filter(param => allowedAttributes.includes(param));

  updateParams.forEach(param => {
    process[param] = req.body[param];
  });

  // Push the updated parameters in the "ActionDone" array if they are not already present
  updateParams.forEach(param => {
    if (!process.ActionDone.includes(param)) {
      process.ActionDone.push(param);
    }
  });

  // Remove updated parameters from the "ActionLeft" array if they are present
  updateParams.forEach(param => {
    const paramIndex = process.actionLeft.indexOf(param);
    if (paramIndex !== -1) {
      process.actionLeft.splice(paramIndex, 1);
    }
  });

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
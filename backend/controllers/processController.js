const Employee = require("../models/employeeModel");
const Child = require('../models/childModel');
const Process = require('../models/processModel');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

// //Create New Process
exports.newProcess = catchAsyncErrors(async (req, res) => {
  const child = await Child.findById(req.params.id)
  const process = await Process.create({child : req.params.id, actionLeft: child.actionLeft})

  res.status(200).json({
    success: true,
    process
  });
});

exports.getSingleProcess = catchAsyncErrors(async (req, res, next) => {
    const process = await Process.find({ child: req.params.childId});
    if(!process)
    {
        return next(new errorHandler("Process not found with this Id",404));
    }
    res.status(200).json({
        success: true,
        process
    });
});

// //get logged in child processs
exports.myProcess = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params; // Access the ID from the request params

  const process = await Process.find({ child: id });
  res.status(200).json({
    success: true,
    process
  });
});



// //get all  processs (admin)
exports.getAllProcess = catchAsyncErrors(async (req, res, next) => {
  const process = await Process.find();

  res.status(200).json({
    success: true,
    process
  });
});



// Update the process with new parameters
exports.updateProcess = catchAsyncErrors(async (req, res, next) => {
  const process = await Process.findById(req.params.id);
  const child = await Child.findById(process.child)
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

  child.actionLeft = child.actionLeft.filter((param) => !updateParams.includes(param));

  await process.save({ runValidatorsBeforeSave: false });
  await child.save({ runValidatorsBeforeSave: false });

  res.status(200).json({
    success: true,
    child,
    process
  });
});



exports.deleteProcess = catchAsyncErrors(async (req, res, next) => {
  const process = await Process.findById(req.params.id);
  if (!process) {
    return next(new errorHandler("Process not found with this Id", 404));
  }
  await Process.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    process
  });
});

exports.getActionDoneDetails = catchAsyncErrors(async (req, res, next) => {
  const process = await Process.findById(req.params.id);

  const actionDoneDetails = [];

  // Retrieve details of each attribute present in ActionDone
  process.ActionDone.forEach(async (attribute) => {
    if (process[attribute]) {
      // Get the value and other details of the attribute
      actionDoneDetails.push({
        [attribute]: {
          value: process[attribute]
          // You can add more details as needed
        }
      });
    }
  });

  res.status(200).json({
    success: true,
    actionDoneDetails,
  });
});


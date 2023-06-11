const Child = require('../models/childModel');
const Employee = require("../models/employeeModel")
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const BackupChild = require('../models/backupChildModel');
const Process = require('../models/processModel');
const ApiFeatures = require('../utils/apifeatures');

//Create child admin

exports.createChild = catchAsyncErrors(async (req, res, next) => {
    // req.body.employee=req.employee.id;
    // console.log(req.body);
    const child = await Child.create(req.body);
    res.status(201).json({
        success: true,
        child
    });
});

//Create all childs Admin
exports.getAllChilds = catchAsyncErrors(async (req, res) => {
    const resultPerPage = 5;
    const childCount = await Child.countDocuments();
    const apiFeature = new ApiFeatures(Child.find(), req.query).search().filter().pagination(resultPerPage);
    const childs = await apiFeature.query;
    // console.log(res.body);
    res.status(200).json({
        success: true,
        childs,
        childCount,
    });
});

exports.getAllCCIsByPinCode = catchAsyncErrors(async (req, res) => {
    const pinCode = req.query.pinCode;

    const CCIs = await Child.distinct("CCI", { "CCI.pinCode": pinCode });

    res.status(200).json({
        success: true,
        CCIs,
    });
});

exports.getChildrenByPincode = catchAsyncErrors(async (req, res) => {
    const { pincode } = req.params.pincode
    const children = await Child.find({ 'CCI.pinCode': pincode });
    res.status(200).json({
        success: true,
        children
    })
})

exports.getChildrenByCCI = catchAsyncErrors(async (req, res) => {
    const CCIName = req.query.CCIName;

    const children = await Child.find({ "CCI.name": CCIName });

    res.status(200).json({
        success: true,
        children,
    });
});

exports.getChildDetails = catchAsyncErrors(async (req, res, next) => {
    const child = await Child.findById(req.params.id);

    if (!child) {
        return next(new errorHandler("Child not found", 404));
    }

    res.status(200).json({
        success: true,
        child,
        childCount
    });
});

// //Update Child Admin
exports.updateChild = catchAsyncErrors(async (req, res, next) => {
    let child = await Child.findById(req.params.id);
    if (!child) {
        return next(new errorHandler("Child Not found", 404));
    }
    child = await Child.findByIdAndUpdate(req.params.id, req.body, {
        new: true, runValidators: true
    });
    res.status(200).json({
        success: true,
        child
    })
});

exports.deleteChild = catchAsyncErrors(async (req, res, next) => {
    const child = await Child.findById(req.params.id);
    const process = await Process.findOne({ child: req.params.id  });
  
    if (!child) {
        return next(new errorHandler("Child Not found", 404));
    }

    // Create a backup child document using the child details
    const backupChild = new BackupChild({
        originalChildId: child._id,
        name: child.name,
        category: child.category,
        keyCase: child.keyCase,
        DateOfBirth: child.DateOfBirth,
        familyDetails: child.familyDetails,
        gender: child.gender,
        images: child.images,
        CCI: child.CCI,
        DateofAdmission: process.DateofAdmission,
        enrollmentDate: process.enrollmentDate,
        photoPublication1: process.photoPublication1,
        photoPublication2: process.photoPublication2,
        tvTelecasting: process.tvTelecasting,
        policeReport: process.policeReport,
        familyApproval: process.familyApproval,
        previousOrgReport: process.previousOrgReport,
        finalReport: process.finalReport,
        FreeForAdoptionDate: process.FreeForAdoptionDate,
        MER: process.MER,
        CSR: process.CSR,
        CaringsUpload: process.CaringsUpload,
        lastVisitByFamily: process.lastVisitByFamily,
        ActionDone: child.actionLeft,
    });

    // Save the backup child document
    await backupChild.save();
  
    // Delete the process document
    await Process.deleteOne({ _id: process._id });

    // Delete the child document
    await Child.deleteOne({ _id: req.params.id });

    res.status(200).json({
        message: "Child and associated process deleted successfully",
        backupChild,
    });
});
  exports.getAllBackupChildDetails = async (req, res, next) => {
    try {
      const backupChildren = await BackupChild.find();
  
      res.status(200).json({
        success: true,
        backupChildren
      });
    } catch (error) {
      next(new errorHandler('Failed to get backup child details', 500));
    }
  };
  
exports.getOneChild = catchAsyncErrors(async (req, res) => {
    const child = await Child.findById(req.params.id);
    if (!child) {
        return next(new errorHandler("Child Not found", 404));
    }
    res.status(200).json({
        success: true,
        child
    });
});

exports.setChildtoEmployee = catchAsyncErrors(async (req, res) => {
    const { c_id, e_id } = req.params;

    const child = await Child.findByIdAndUpdate(c_id,
        {
            isAssigned: true,
            assignedTo: e_id
        });

    const employee = await Employee.findByIdAndUpdate(e_id,
        { $push: { children: child } },
        { new: true });

    res.status(200).json({
        success: true,
        employee
    })
})

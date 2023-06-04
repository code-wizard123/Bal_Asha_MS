const Child = require('../models/childModel');
const errorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
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
        childCount
    });
});

// exports.getChildDetails = catchAsyncErrors(async (req, res, next) => {
//     const child = await Child.findById(req.params.id);

//     if (!child) {
//       return next(new errorHandler("Child not found", 404));
//     }

//     res.status(200).json({
//       success: true,
//       child,
//       childCount
//     });
//   });


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
    if (!child) {
        return next(new errorHandler("Child Not found", 404));
    }
    await Child.deleteOne({ _id: req.params.id });
    res.status(200).json({
        message: "Child deleted successfully"
    })


});
// exports.getOneChild=catchAsyncErrors(async(req,res)=>{
//     const child= await Child.findById(req.params.id);
//     if(!child)
//     {
//         return next(new errorHandler("Child Not found",404));
//     }
//     res.status(200).json({
//         success:true,
//         child
//     });
// });

// exports.createChildReview=catchAsyncErrors(async(req,res,next)=>{
//     const {rating,comment,childId}=req.body;
//     const review={
//         employee:req.employee.id,
//         name:req.employee.name,
//         rating:Number(rating),
//         comment,
//     }
//     const child=await Child.findById(childId);
//     const isReviewed=child.reviews.find(rev=>rev.employee.toString()===req.employee._id.toString())
//     if(isReviewed)
//     {
//         child.reviews.forEach(rev=>{
//             if(rev.employee.toString()===req.employee._id.toString())
//             {
//                 rev.rating=rating,
//                 rev.comment=comment
//             }
//         })
//     }
//     else
//     {
//         child.reviews.push(review);
//         child.numOfReviews=child.reviews.length;
//     }
//     let avg=0;
//     child.reviews.forEach(rev=>{
//         avg+=rev.rating;
//     })
//     child.ratings=avg/child.reviews.length;
//     await child.save({validateBeforeSave:false});
//     res.status(200).json({
//         success:true,

//     })
// });
// exports.getChildReviews=catchAsyncErrors(async(req,res,next)=>{
//     const child=await Child.findById(req.query.id);
//     if(!child)
//     {
//         return next(new errorHandler("Child Not found",404));
//     }
//     res.status(200).json({
//         success:true,
//         reviews:child.reviews,
//     });
// });

// exports.deleteReview=catchAsyncErrors(async(req,res,next)=>{
//     const child=await Child.findById(req.query.childId);
//     if(!child)
//     {
//         return next(new errorHandler("Child Not found",404));
//     }
//     const reviews=child.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString());

//     let avg=0;
//     reviews.forEach(rev=>{
//         avg+=rev.rating;
//     })
//     const ratings=avg/reviews.length;

// const numOfReviews=reviews.length;

//     await Child.findByIdAndUpdate(req.query.childId,
//         {
//             reviews,ratings,numOfReviews,
//         },{
//             new:true,
//             runValidators:true,
//         })
//     res.status(200).json({
//         success:true,
//     });
// });


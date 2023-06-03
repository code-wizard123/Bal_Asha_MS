
const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product name"],
        trim:true

    },
    description:{
        type:String,
        required:[true,"Please Enter Product description"]

    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxLength:[8,"Price cannot exceed 8 digits "]
    },
    ratings:{
        type:Number,
        default:0

    },
    images:[
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }

    ],
    category:{
        type:String,
        // required:[true,"Please Enter Product Category"],

    },
    stock:{
        type:Number,
        // required:[true,"Please Enter Product Stock available"],
        maxlength:[4,"Stock cannot exceed 4 characters"]
    },
    numOfReviews:{
        type:Number,
        default:0,

    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"Employee",
            required:true,
        },
        name:{
            type:String,
            // required:true

        },
        rating:{
            type:Number,
            // required:true
    
        },
        comment:{
            type:String,
            // required:true
    
        },

        
    }],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"Employee",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,

    },

})
module.exports=mongoose.model("Product",productSchema);
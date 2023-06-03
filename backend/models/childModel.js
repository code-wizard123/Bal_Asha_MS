
const mongoose=require('mongoose');

const childSchema=new mongoose.Schema({
    name:{
        type:String,
        default:"Anonymous",
        trim:true

    },
    description:{
        type:String,
        required:[true,"Please Share the description of the child"]

    },
    age:{
        type:Number,
        required:[true,"Please Enter Approximate age "],

    },
    pinCode:{
        type:Number,
        required:true

    },
    orphanage:{
        type:String,
        required:true
    },
    images:[
        {
        public_id:{
            type:String,
            default:"Dummy"
            // required:true
        },
        url:{
            type:String,
            default:"dummy"
            // required:true
        }
    }

    ],
    type:{
        type:String,
        required:[true,"Please Enter type of Case for this child"],

    },
    employee:{
        type:mongoose.Schema.ObjectId,
        ref:"Employee",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,

    },

})
module.exports=mongoose.model("Child",childSchema);
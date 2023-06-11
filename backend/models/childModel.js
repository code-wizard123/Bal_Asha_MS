const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const childSchema = new Schema({
  name: {
    type: String,
    default: "Anonymous",
    trim: true
  },
  category: {
    type: Number,
    required: [true, "Please Enter the type of Case for this child"]
  },
  keyCase: {
    type: String,
    required: [true, "Please Share the description of the child"]
  },
  DateOfBirth: {
    type: Date,
    required: [true, "Please Enter the Approx Date of Birth"]
  },
  familyDetails: {
    type: String,
    default: "No details of the family known"
  },
  gender: {
    type: String,
    required: true
  },
  pincode:{
    type:Number,
    default:400053,
    required:true
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      }
    }
  ],
  CCI: [
    {
      name:{
        type:String,
        // required:true
      },
      pinCode: {
        type: Number,
        // required: true
      },
      CCIdescription:{
        type:String,
        // required:true
      },
      public_id: {
        type: String,
      },
      url: {
        type: String,
      }
    }
  ],
  actionLeft: {
    type: [String],
    default: function () {
      if (this.category === 1) {
        return ["photoPublication1", "photoPublication2", "tvTelecasting", "policeReport", "MER", "ScreenShot"];
      } else if (this.category === 2) {
        return ["familyApproval", "lastVisitByFamily", "ScreenShot"];
      } else {
        return ["photoPublication1", "photoPublication2", "tvTelecasting", "policeReport", "MER", "OrphanCertificate", "ScreenShot"];
      }
    }
  },

  isAssigned: {
    type: Boolean,
    default: false
  },

  assignedTo: {
    type: String,
    default: "Not Assigned"
  }
});

const Child = mongoose.model('Child', childSchema);

module.exports = Child;

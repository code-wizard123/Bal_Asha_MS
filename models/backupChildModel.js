const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const backupChildSchema = new Schema({
  originalChildId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Child",
    required: true,
  },
  name: {
    type: String,
    default: "Anonymous",
    trim: true,
  },
  category: {
    type: Number,
    required: [true, "Please enter the type of case for this child"],
  },
  keyCase: {
    type: String,
    required: [true, "Please share the description of the child"],
  },
  DateOfBirth: {
    type: Date,
    required: [true, "Please enter the approximate date of birth"],
  },
  familyDetails: {
    type: String,
    default: "No details of the family known",
  },
  gender: {
    type: String,
    required: true,
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  CCI: [
    {
      name: {
        type: String,
      },
      pinCode: {
        type: Number,
      },
      CCIdescription: {
        type: String,
      },
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  DateofAdmission: {
    type: Date,
    default:Date.now
    // required: true
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
    // required: true
  },
  photoPublication1: [{
    dateRegistered: {
      type: Date
    },
    nameofChannel: {
      type: String
    },
    public_id: {
      type: String,
      // required: true
    },
    url: {
      type: String,
      // required: true
    }
  }],
  photoPublication2: [{
    dateRegistered: {
      type: Date
    },
    nameofChannel: {
      type: String
    },
    public_id: {
      type: String,
      // required: true
    },
    url: {
      type: String,
      // required: true
    }
  }],
  tvTelecasting: [{
    channelName: {
      type: String
    },
    dateofPublishing: {
      type: Date
    }
  }],
  policeReport: [{
    dateRegistered: {
      type: Date
    },
    public_id: {
      type: String,
      // required: true
    },
    url: {
      type: String,
      // required: true
    }
  }],
  familyApproval: [{
    dateRegistered: {
      type: Date
    },
    public_id: {
      type: String,
      // required: true
    },
    url: {
      type: String,
      // required: true
    }
  }],
  previousOrgReport: {
      dateRegistered: {
          type: Date
        },
        public_id: {
          type: String,
  
          // required: true
        },
        url: {
          type: String,
  
          // required: true
        }
  },
  finalReport: {
      dateRegistered: {
          type: Date
        },
        public_id: {
          type: String,
  
          // required: true
        },
        url: {
          type: String,
  
          // required: true
        }
  },
  FreeForAdoptionDate: {
      dateRegistered: {
          type: Date
        },
        public_id: {
          type: String,
  
          // required: true
        },
        url: {
          type: String,
  
          // required: true
        }
  },
  MER: {
      dateRegistered: {
          type: Date
        },
        public_id: {
          type: String,
  
          // required: true
        },
        url: {
          type: String,
  
          // required: true
        }
  },
  CSR: {
      dateRegistered: {
          type: Date
        },
        public_id: {
          type: String,
  
          // required: true
        },
        url: {
          type: String,
  
          // required: true
        }
  },
  CaringsUpload: {
      dateRegistered: {
          type: Date
        },
        public_id: {
          type: String,
  
          // required: true
        },
        url: {
          type: String,
  
          // required: true
        }
  },
  lastVisitByFamily: {
    type: Date
  },
  ActionDone: {
    type: [String],
    default: function() {
      // Retrieve actionLeft from the Child model
      return Child.findById(this.originalChildId)
        .then(child => child.actionLeft)
        .catch(error => {
          console.error('Error retrieving actionLeft:', error);
          return [];
        });
    }
  }
  
  // Add other attributes based on the actionLeft
});

const BackupChild = mongoose.model('BackupChild', backupChildSchema);

module.exports = BackupChild;

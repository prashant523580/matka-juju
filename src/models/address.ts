const mongoose = require("mongoose");
                
const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 50,
  },
 phone : {
    type: String,
    required: true,
    trim: true,
  },
  street: {
    type: String,
    required: true,
    trim: true,
  },
  locality: {
    type: String,
  },
 
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
  },
  email:{
    type: String
  }
});


const userAddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  address: [addressSchema],
}, {
  timestamps: true
});

export const Address =  mongoose.models.Address || mongoose.model("Address", addressSchema);
export const UserAddress = mongoose.models.UserAddress || mongoose.model("UserAddress", userAddressSchema);
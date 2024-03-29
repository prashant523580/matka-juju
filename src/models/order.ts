const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAddress.Address",
        required: true,
        //  autopopulate: true
    },
    items: [{
        productId: {

            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        payablePrice: {
            type: Number,
            // required:true
        },
        purchasedQuantity: {
            type: Number
        }
    }],
    totalAmt:{
        type: Number
    },
    paymentStatus: {
        type: String,
        enum: ["cancelled", "pending", "refund", "completed"]
    },
    paymentType: {
        type: String,
        emum: ["cod", "card", "esewa"],
        // required: true 
    },
    order:{
        type: String,
        enum: ["cancelled", "pending", "success"]
    },
    orderId:{
        type:String
    },
    orderStatus: [
        {
            type: {
                type: String,
                enum: ["ordered", "packed", "shipped", "delivered"]
            },
            date: {
                type: Date
            },
            isCompleted: {
                type: Boolean,
                default: false
            }
        }
    ]
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
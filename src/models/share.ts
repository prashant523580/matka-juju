import mongoose from "mongoose";

const SharesSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        enum: ['facebook', 'instagram', 'twitter'],
        required: true,
    },
    count: {
        type: Number,
        required: true,
        default: 0,
    },
    shareId:{
        type: mongoose.Schema.Types.ObjectId
    }
}, {
    timestamps: true
})


export default mongoose.models.Shares || mongoose.model("Shares", SharesSchema);
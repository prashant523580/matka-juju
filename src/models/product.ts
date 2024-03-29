import mongoose, { Document, Model } from "mongoose";

interface IPost extends Document{
    name:String
    images:any[]
    category:any,
    slug:String,
    description:any,
    createdBy: any,
    content:any
}

const postSchema = new mongoose.Schema({
    name:String,
    slug:{
        type:String,
        unique: true,
        required:[true,"slug is required."]
    },
    images:[{
        publicId:String,
        src:String
    }],
 
    description:{
        type:String
    },
    // content:any,
    discount: Number,
    price: Number,
    isOffer:Boolean,
    // colors:[
    //     {type:String}
    // ],
    size: String,
    keywords:Array,
    category :
        {type: mongoose.Schema.Types.ObjectId,ref:'Category'}
    ,
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, ref:"User"
    }
},{
    timestamps: true
})

// const Post : Model<IPost> =
export default  mongoose.models.Product || mongoose.model("Product", postSchema);;
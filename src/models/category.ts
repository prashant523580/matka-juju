import mongoose, { Model } from "mongoose"
interface ICategory {
    name:String,
    slug:String,
    parentId:String,
    image:any,
    active:Boolean,
    color: String,
    isMedia: Boolean
}

let categorySchema = new mongoose.Schema({
    name:String,
    slug:{
        type:String,
        required : true
    },
    // parentId:String || null,
    image:{
        publicId: String,
        src:String
    },
    keywords:Array,
    description:String
},{
    timestamps:true
});


export default mongoose.models.Category || mongoose.model("Category",categorySchema);

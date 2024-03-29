import { getCategoryWithChild } from "@/libs/categories";
import Category from "@/models/category";
import connectToMongodb from "@/utils/db/dbcon";
export const getAllCategory = async () => {
        try{

            await connectToMongodb() 
            let category = await Category.find();
            let categories = getCategoryWithChild(category);
            return categories
        }catch(err){
            console.log(err)
            return null
        }
}
export const getCategoryByIdAndUpdate = async (category : any) => {
    try{
        let currentCateory = await Category.findOneAndUpdate({_id : category._id} , category ,{upsert:true});
        return currentCateory
    }catch(error){
        console.log(error)
        return null
    }
} 
export const getCategoryByIdandDelete = async (_id : string) => {
    try{

        let isDeleted = await Category.findByIdAndDelete(_id);
        return isDeleted
    }catch(error){
        console.log(error)
    }
}
export const getCategoryBySlug = async (slug :string) => {
    try{
        // console.log(slug)
        await connectToMongodb();
        let category = await Category.findOne({
            slug
        });
        // console.log(category)
        return category
    }catch(err){
        return null
    }
}
export const getCategoryById = async (_id :{_id:any}) => {
    try{
        let category = await Category.findById(_id);
        return{
            success: true,
            category
        }
    }catch(err){
        return {
            success: false,
            message:"somethings went wrong",
            category : null
        }
    }
}
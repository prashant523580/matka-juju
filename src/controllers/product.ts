import Product from "@/models/product"
import connectToMongodb from "@/utils/db/dbcon";

export const getProductBySlug = async (slug : string) => {
    // console.log(slug)
    await connectToMongodb();
    let product = await Product.findOne({
        slug : slug
    }).populate("category","name slug").populate("createdBy",'name image');
    return product
}
export const updateProduct = async (post: any) => {
    await connectToMongodb();
    let updatedPost = await Product.findOneAndUpdate({_id : post._id} , post);
    return updatedPost
}
export const getAllPosts = async () => {
    // console.log(slug)

    let product = await Product.find().populate("category","name slug").populate("createdBy",'name image');
    return product
}

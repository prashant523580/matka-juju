import { getCategoryWithChild } from "@/libs/categories";
import Category from "@/models/category";
import Product from "@/models/product";
import User from "@/models/user";
import connectToMongodb from "@/utils/db/dbcon"

export const getInitialData = async () => {
    try{
        await connectToMongodb();
        let postPipeline = [
            {
              $lookup: {
                from: 'categories', // Assuming the posts collection name is 'posts'
                localField: 'category',
                foreignField: '_id',
                as: 'category',
              },
            },
            {
              $lookup: {
                from: 'users', // Assuming the posts collection name is 'posts'
                localField: 'createdBy',
                foreignField: '_id',
                as: 'createdBy',
              },
            },
            { $unwind: "$category" },
            { $unwind: "$createdBy" },
            {
              $project: {
                "_id": 1,
                "title": 1,
                "slug": 1,
                "description": 1,
                "createdBy.name": 1,
                "createdBy.image": 1,
                "category": 1,
                "image": 1,
                "createdAt": 1,
                "updatedAt": 1,
                "upload" :1,
                "isBreaking":1
              }
            }
          ];
          let products = await Product.find().populate("category","name slug image").populate("createdBy","name image").sort({createdAt : -1});
         
          let category = await Category.find();
          await User.find();
         
            // console.log(category,posts)
            let categories = getCategoryWithChild(category);
            let data = {
              products,
              category : categories
            }
            return data
    }catch(err){
        console.log(err)
        return null
    }
}
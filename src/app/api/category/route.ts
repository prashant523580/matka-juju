
import { NextRequest, NextResponse } from "next/server";
import connectToMongodb from "@/utils/db/dbcon";
// import Category from "@/models/category";
import { createCategories, getCategoryWithChild } from "@/libs/categories";
// import { authMiddleware } from "@/lib/authMiddleware";
import { getCategoryByIdAndUpdate } from "@/controllers/category";
import Category from "@/models/category";
import slugify from "slugify";

export async function GET(request: Request,{searchParams}:any) {
    // const remaining = await limiter.removeTokens(1);
    // console.log("remaining : ", remaining);
        
    const origin = request.headers.get("origin");
    
    await connectToMongodb();
    let category= await Category.find();
    // console.log(category)
    let allcate = createCategories(category);
    let categories = getCategoryWithChild(allcate);
    // console.log(allcate)
    return new NextResponse(JSON.stringify(category), {
        status: 200, // request limited 
        headers: {
            'Set-Cookie': 'token ',
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": origin || "*"
        },
        statusText: "Success"
    })
}

export async function POST(request:NextRequest){
    try{
        await connectToMongodb();
        const newCategory = await request.json();
        // let auth = await authMiddleware(request);
        // console.log(newCategory)
        // if(auth.success === true){
            let existedCategory = await Category.findOne({
                name: newCategory.name,
                
            })
            if(existedCategory) return NextResponse.json({
                message:"Already existed category name",
                success: false
            },{
                status:400
            });
                
            let newCate = await Category.create({
                ...newCategory,
                slug: slugify(newCategory.name),
                // parentId: newCategory.parentId ? newCategory.parentId : null,
                // active : newCategory.active ==="true"? true : false,
                // createdBy:auth._id
            });
            return NextResponse.json({
                // newCategory,
                category: newCate,
                success: true,
                message: "Successfully Add Category."
            },{
                status: 201,
                statusText:"Success"
            })
        // }
        // await connectToMongodb();
        //  let categories = await Category.insertMany(category);
        // console.log(categories)       
    }catch(error){
        console.log(error);
        return NextResponse.json({
            message : "somethigs wents wrongs",
            success: false
        },
        {
            status: 400
        })
    }
    
}

export async function PUT(req:NextRequest){
    try{
        let data = await req.json();
        console.log(data)
        let category = await getCategoryByIdAndUpdate(data);

        return NextResponse.json({
            message : "successfully updated category",
            success: true,
            category
        },{
            status: 202
        })
    }catch(error){

    }
}
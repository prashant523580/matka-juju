import { getProductBySlug } from "@/controllers/product"
import Category from "@/models/category";
import user from "@/models/user";
import connectToMongodb from "@/utils/db/dbcon";
import { NextResponse } from "next/server"

export async function GET(req: any, context: { params: { slug: string } }) {
    await connectToMongodb()
    try {
        // console.log(context.params.slug)
        await Category.find({});
        await user.find({});
        let product : any = await getProductBySlug(context.params.slug);
       
        return new NextResponse(JSON.stringify(product));
    } catch (err) {
        console.log(err)
    }

}
import { authMiddleware } from "@/libs/authMiddleware";
import { UserAddress } from "@/models/address";
import Order from "@/models/order";
import product from "@/models/product";
import connectToMongodb from "@/utils/db/dbcon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest, context: {params: {slug: string}}){
        try{
                await connectToMongodb();
                let auth = await authMiddleware(req);
                // console.log(auth)
                await product.find()
                // await 
                if(auth.success == false) return NextResponse.json({
                        message: "authorization required!",
                        success: false
                })
                let orders = await Order.findOne({ _id: context.params.slug }).populate("items.productId","name images _id price category discount");
                let data = {
                        ...orders._doc,
                }
                if(orders){
                    let address = await UserAddress.findOne({user :  auth._id});
                     address.address.find((adr:any) => {
                        //     console.log(adr._id)
                        if(adr._id.toString() == orders.addressId.toString()){
                              data.address = adr
                                // console.log({adr})
                               
                        }
                    });
                //     console.log({orders})
                }
                // console.log({data})
                return new NextResponse(JSON.stringify(data))
        }catch(error){
                console.log(error)
                return NextResponse.json({message: "somethings went wrongs" , success : false})
                
        }
}
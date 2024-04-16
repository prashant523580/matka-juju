
import { UserAddress } from "@/models/address";
import order from "@/models/order";
import connectToMongodb from "@/utils/db/dbcon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
    try {

        // console.log(token)
        await connectToMongodb();


        let orders = await order.find().populate("items.productId","name images _id price category discount").populate("user");
       
        
            let orderArray : any[] = [];
               // Iterate through each order to populate the address field
        for (const orderItem of orders) {
            // Find the corresponding address in UserAddress model
            const address = await UserAddress.findOne({ user: orderItem.user._id });

            // Find the matching addressId in the address array
            const matchedAddress = address?.address.find((adr: any) => adr._id.toString() === orderItem.addressId.toString());

            if (matchedAddress) {
                // Update the address field in the order
                orderItem._doc["address"] = matchedAddress;

                // Push the updated order to the orderArray
                orderArray.push(orderItem);
            }
        }
            // ordersCopy.map( async (order : any) => {

            //     let address = await UserAddress.findOne({user :  order.user._id});
            //     address.address.find((adr:any) => {
            //         //     console.log(adr._id)
            //         if(adr._id.toString() == order.addressId.toString()){
            //             order.addressId = adr
            //             // console.log(order)
            //             orderArray.push({
            //                 ...order,
            //                 address : adr
            //             })
                        
            //         }
            //     });
            // })
            // console.log({orderArray})
        
        // console.log(orders)
       return new  NextResponse(JSON.stringify(orders))
    } catch (error: any) {
       return NextResponse.json({ error })
    }
}
export async function POST(req:NextRequest, res: NextResponse) {
    try{
        // console.log(req)
        let data = await req.json();
        let updatedOrder = await order.updateOne({
            _id:data.order_Id,
            "orderStatus.type": data.type,
        },{
            $set:{
                'orderStatus.$': [
                    {
                        type:data.type, date: new Date(), isCompleted: true
                    },
                ],
            },
        });
       
        return NextResponse.json({
            status : "success",
            order : updatedOrder
        })
    }catch(error){
        console.log(error)
        return new NextResponse(JSON.stringify(error))
    }
}

export async function PUT(req : NextRequest,res:NextResponse){
    try{
        const data = await req.json();
        // console.log(data)
        let corder = await order.findByIdAndUpdate(data.order_Id,{
            paymentStatus: data.status
        })
        console.log(corder)
        // let updatedOrder = await order.updateOne({
        //     _id:data.order_Id,
        //     "paymentStatus": data.status,
        // }
        // ,{
        //     $set:{
        //         'paymentStatus': data.status,
        //     },
        // });
       
        return NextResponse.json({
            status : "success",
            order : corder,
            success : true
        })
       
    }catch(error){
        console.log(error)
         return new NextResponse(null)
    }
}
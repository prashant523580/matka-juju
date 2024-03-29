
import { authMiddleware } from '@/libs/authMiddleware';
import { Address, UserAddress } from '@/models/address';
import Cart from '@/models/cart';
import Order from '@/models/order';
import Product from '@/models/product';
import connectToMongodb from '@/utils/db/dbcon';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';


// const ObjectId = require("mongodb").ObjectId;

export async function POST(req: NextRequest) {
    try {

        const data = await req.json();
        const auth = await authMiddleware(req);

        const cart = await Cart.deleteOne({ user: auth._id });
        if (cart) {
            // req.body.user = auth._id;
            let orderStatus = [
                {
                    type: "ordered",
                    date: new Date(),
                    isCompleted: true
                },
                {
                    type: "packed",
                    isCompleted: false
                },
                {
                    type: "shipped",
                    isCompleted: false
                },
                {
                    type: "delivered",
                    isCompleted: false
                }
            ]
            let newOrder = {
                ...data,
                orderStatus,
                user:auth._id
            }
            const order = await Order(newOrder);
            let added_order = await order.save();
        
           return NextResponse.json({ order: added_order, message: "successfully order Completed",success: true });

        }
    } catch (error) {
        console.log(error)
        return new NextResponse(null)
    }

}

export async function GET(req: NextRequest, res: NextResponse) {
    try {

        // console.log(token)
        await connectToMongodb();
        let auth = await authMiddleware(req);
        if(auth.success === false) NextResponse.json({
            message:"authenticate required"
        })
        // let decoded = jwt.decode(token, process.env.NEXT_PUBLIC_JWT_SECRET_KEY);
        // console.log(auth)
        let orders = await Order.find({ user: auth._id }).populate("items.productId","name images _id price category discount");
        // if(orders){
        //     let address = await UserAddress.findOne({user :  auth._id});
        //     orders.address = address.address.find((adr:any) => adr._id == orders.addressId);
        //     console.log({orders})
        // }
        // console.log({orders})

       return new  NextResponse(JSON.stringify(orders))
    } catch (error: any) {
       return NextResponse.json({ error })
    }
}
export async function PUT(req: NextRequest, res: NextApiResponse) {
    try {
        await connectToMongodb();
        let order = await req.json();
        let auth = await authMiddleware(req);
        if(auth.success === false) NextResponse.json({
            message: "authentication required!",
            success: false
        })

        // console.log(decoded._id)
        let orders = await Order.findOneAndUpdate(
            // { _id: new ObjectId(order._id) },
            { _id: order._id },
            { $set: { "order": "cancelled" } }
        );
        // await orders.save();
        // console.log(JSON.stringify(orders))

        return NextResponse.json({ message: "successfully cancelled order.", orders, success: true })

    } catch (error: any) {
        console.log(error)
       return  NextResponse.json({ error }, { status: 422 })
    }
}






    // try {
    //     await connectToMongodb();
    //         let {  items, address, amount, orderId, paymentMethod } = await req.json();
    //         // console.log(req.body)

    //         console.log({items,address,amount,orderId})
    //         let status = [
    //             {
    //                 type: "ordered",
    //                 date: new Date(),
    //                 isCompleted: true
    //             },
    //             {
    //                 type: "packed",
    //                 isCompleted: false
    //             },
    //             {
    //                 type: "shipped",
    //                 isCompleted: false
    //             },
    //             {
    //                 type: "delivered",
    //                 isCompleted: false
    //             }
    //         ]
    //         const auth = await authMiddleware(req);
    //         // console.log(auth)
    //         if(auth.success === false) NextResponse.json({
    //             message:"LOgin required",
    //             success: false
    //         })
    //         let product;
    //         let sumTotal = 0;
    //         for (let key in products) {
    //             // console.log(products[key].product.price * products[key].quantity)
    //             sumTotal += products[key].quantity * products[key].product.price
    //             product = await Product.find({ slug: products[key].product.slug });

    //             // if (product[0].availableQuantity < products[key].qty) {
    //             //     return NextResponse.json({
    //             //         message: 'Some items in your cart went out of stock. please try again.',
    //             //         success:false
    //             //     })
    //             // } else {

    //             // }
    //             if (product[0].price != products[key].product.price) {
    //                 return NextResponse.json({
    //                     message: 'The price of some items in your cart have changed. Please try again.',
    //                     success: false
    //                 })
    //             }
    //             // console.log({sumTotal, product})
    //         }
    //         if (amount != sumTotal) {
    //             return NextResponse.json({
    //                 error: 'The price of some items in your cart have changed. Please try again.',
    //                 success:false,
    //             })
    //         }
    //         let order = await  Order.create({userID : auth._id ,orderId,
    //             addressId: address ,
    //             orderStatus:"pending", items :products,amount,status,paymentStatus: "pending",paymentMethod:"COD"});
    //         // //  db.collection("Orders").insertOne({userID,orderId,orderStatus:"pending",products,address,amount,status,paymentStatus: "pending",paymentMethod:"COD"});
    //         console.log({order})
    //         for (let key in products) {
    //             console.log(key)
    //             //   let prod =  await db.collection("Products").fineOneAndUpdate({slug:key} , {$inc :{availableQuantity : -products[key].qty}}).toArray();
    //             //     console.log(prod)
    //         }
    //         // res.redirect("/orders", 200 )
    //         return NextResponse.json({
    //             message: 'successfully created order',
    //             success: true
    //         })
    //     } catch (error: any) {
    //         return NextResponse.json({
    //            message: "Something went wrong.",
    //             success:false
    //         })
    //     }
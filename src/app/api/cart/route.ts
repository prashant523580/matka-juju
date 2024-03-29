import { authMiddleware } from "@/libs/authMiddleware";
import Cart from "@/models/cart";
import connectToMongodb from "@/utils/db/dbcon";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
    try{
         await connectToMongodb();
         let auth = await authMiddleware(req);
        if(auth.success === false) redirect("/login")
         let carts = await Cart.findOne({
            user: auth._id
         }).populate("user").populate("cartItems.product")
            return new NextResponse(JSON.stringify(carts))
    }catch(error){

        console.log(error)
        return NextResponse.json({
            error
        },
        {
            status:401
        })
    }
}
export async function POST(req:NextRequest){
    try{
            let cartItems = await req.json();
    
          
            let auth = await authMiddleware(req);
            const existCart = await Cart.findOne({
                user: auth._id
            });
    
            if (existCart) {
                // cartItems.forEach((cartItem) => {
                // })
                const product = cartItems.product;
            //  console.log({cartItems})
                let isItemAdded = existCart.cartItems.find((cart : any) => {
                    // console.log(cart)
                    return cart.product == product
                });
                let condition, action;
                if (isItemAdded) {
                    // console.log({isItemAdded})
                    condition = {
                        "user": auth._id,
                        "cartItems.product": product
                    };
                    action = {
                        "$set": {
                            "cartItems.$": {
                                ...cartItems,
                                quantity: isItemAdded.quantity + cartItems.quantity
                            }
                        }
                    };
    
                } else {
                    condition = {
                        user: auth._id
                    };
                    action = {
                        "$push": {
                            'cartItems': cartItems
                        }
                    }
                }
                let updated = await Cart.findOneAndUpdate(condition, action)
                return NextResponse.json({
                    cartItems: updated,
                    message:"update"
                });
            } else {
             
                const cart = await new Cart({
                    user: auth._id,
                    cartItems: cartItems
                });
                const added_cart = await cart.save();
               
                if (added_cart) {
                    return NextResponse.json({
                        cartItems: added_cart,
                        message:"added"
                    });
                }
            }
    
            return NextResponse.json({
                message: "auth access success"
            },
            {
                status:201
            })
    }catch(error){

        console.log(error)
        return NextResponse.json({
            error
        },
        {
            status:401
        })
    }
}

export async function PUT(req:NextRequest,res:NextResponse){
    try{
        await connectToMongodb()
        const {
            productId
        } = await req.json();
    let auth = await authMiddleware(req);
    console.log({productId,auth})
        if (!productId) NextResponse.json({
            message:"productId required",
            success: false
        }) 
      let deletedcart = await Cart.findOneAndUpdate({
            user: auth._id
        }, {

            $pull: {
                cartItems: {
                    product: productId
                }
            }
        })
        // .exec((err:any, result:any) => {
        //     if (err) return NextResponse.json({
        //         error: err
        //     });
        //     if (result) {
        //         return NextResponse.json({
        //             result
        //         });
        //     }
        // })
        return NextResponse.json({
            message:"success"
        })
    }catch(error){
        console.log(error)
            return new NextResponse(null)
        
    }
}
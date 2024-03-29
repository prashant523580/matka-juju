import { authMiddleware } from "@/libs/authMiddleware";
import { UserAddress } from "@/models/address";
import user from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,res:NextResponse){
    try {
        await user.find();
        let auth = await authMiddleware(req);
        if(auth.success === false) NextResponse.json({
            message:"authenticated required"
        })
        let userAddress = await UserAddress.findOne({
            user: auth._id
        });
        if (!userAddress) {
            return NextResponse.json({
                success: false,
                message : "address not found"
            });
        }
        return new NextResponse(JSON.stringify(userAddress))
    } catch (error) {
        return NextResponse.json({
            error,
            message: "somethings went worng"
        });
    }
}

export async function POST(req:NextRequest,res: NextResponse){
    try {
        const payload = await req.json();
        await user.find();
        // console.log(payload.address)
        // let address = await UserAddress({payload});
        // res.status(201).json({address})
        // return res.status(200).json({payload})
        let auth = await authMiddleware(req);
        // console.log({auth})
        if (payload?.address?._id) {
            let address = await UserAddress.findOneAndUpdate({
                user: auth._id,
                "address._id": payload.address._id
            }, {
                $set: {
                    "address.$": payload.address,
                }
            });
            return NextResponse.json({
                address,
                success: true
            })
        } else {
            let address = await UserAddress.findOneAndUpdate({
                user: auth._id
            }, {
                $push: {
                    address: payload.address
                }
            }, {
                new: true,
                upsert: true
            })
            if(!address) NextResponse.json({
                message:"somethings went wrong",
                status:400
            })
            return NextResponse.json({
                message:"successfully added addresss",
                success: true
            })
        }
 
    } catch (err) {
        return NextResponse.json({
        message: "Params address required",
            err
        });
    }
}
import { encryptPassword } from "@/libs/aes";
import User from "@/models/user"
import connectToMongodb from "@/utils/db/dbcon";
import { NextResponse } from "next/server"

export async function POST(){
    await connectToMongodb();
    let adminObj = {
        name:'Matka Juju',
        phone:"08197299",
        email:"matkajuju@admin.com",
        image:{
            publicId:"khabarpati/y92ben8xvnwt4337tqbv",
            src:"https://res.cloudinary.com/db4vgbevh/image/upload/v1685811299/khabarpati/y92ben8xvnwt4337tqbv.png"
        },
        role:"superadmin",
        socialLink:{
            facebook:"",
            teitter:"",
            instagram:"",
            youtube:"",
        },
        company:"Matka",
        active: true,
        password:"admin"
    }
    try{
        let superAdminExist = await User.findOne({email: adminObj.email});
        if(superAdminExist){
            return new NextResponse(null)
        }


            let admin = await User.create(adminObj);
            console.log(admin);
            return  NextResponse.json({
                success: true
            })
        
        
    }catch(error){
        console.log(error)
        return new NextResponse(null)
    }
}
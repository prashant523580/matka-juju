import { encryptPassword } from "@/libs/aes";
import mongoose, { Document, Model } from "mongoose";

export interface IUsers extends Document{
    image:any,
    name: string,
    email:string,
    password:string,
    socialLinks:any,
    role: any,
    phone:string,
    company:string
}

const UserSchema = new mongoose.Schema({
    image:{
        publicId: String,
        src:String
    },
    name:{
        type:String,
        required:[true,"Name is Required."]
    },
    email:{
        type:String,
        unique:[true,"already existed email."],
        required: [true,"Email is required."]
    },
    password:{
        type:String,
        // required: [true,"Password is required."]
    },
    socialLinks:{
        facebook: String,
        linkedin: String,
        twitter: String,
        instagram:String
    },
    role:{
        type:String,
        enum:["superadmin","admin","user"]
    },
    phone:String,
    company:String
},{
    timestamps: true
});
UserSchema.pre('save', async function(next) {
        if(this.password !== ""){
            
            this.password =  encryptPassword(this.password as any);
        }
    // this.passwordConfirm = undefined;
      next();
});

// const User :Model<IUsers> = ;

export default  mongoose.models.User || mongoose.model("User", UserSchema);
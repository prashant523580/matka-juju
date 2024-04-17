import { decryptPassword } from "@/libs/aes";
import User from "@/models/user"
import connectToMongodb from "@/utils/db/dbcon";

export const getUserById = async (_id:string) => {
    try{
        await connectToMongodb()
        let user = await User.findById(_id);
        // console.log(user)
        return user

    }catch(error){
        console.log(error)
    }
}
export const getUserByIdAndDelete = async (_id: string) => {
    try{

        let isDeleted = await User.findByIdAndDelete(_id);
        return isDeleted
    }catch(error){
        console.log(error)
    }
    
}
export const loginCheckUser = async (email : string,password :string) => {
    
    try{
        await connectToMongodb()

        let user = await User.findOne({
            email : email
        });
        if(!user){
            return { 
                message : "Username or password worng.",
                success: false,
            }
        }
        let decryptPass = await decryptPassword(user.password);
        // console.log(decryptPass);
        if(!(decryptPass === password)){
            return { 
                message : "Username or password worng.",
                success: false,
            }
        }
        return { 
                message : "Successfully login.",
                success: true,
                user
                }
        
    }catch(error){
        console.log(error)
    }
}
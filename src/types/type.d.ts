
export type IPropsUser = {
    name?:String
    email?:String,
    phone?:String,
    role?:String,
    location?:String,
    company?:String,
    image?: any,
    password?:String,
    cpassword?:String,
    createdAt?:String,
    socialLinks?:{
        facebook?:String,
        instagram?: String,
        linkedin?: String
    }
}
export type ICategoryChild = {
    _id?: any,
    name?: any,
    image?: any,
    slug?:any,
    parentId?:any,
    children?: any[ICategoryChild],
}
// authMiddleware.js

import { NextRequest, NextResponse } from 'next/server';
import { verifyJwtToken } from './jwt';
import { getUserById } from '@/controllers/user';




export const authMiddleware = async (req: NextRequest) => {
  // console.log(context.request,"null")
  const authorization = await req.headers.get("authorization");
  // console.log(authorization)
  if (!authorization) {

    return {
      message: "authorization required!",
      success: false,
    }
  }
  const [,token] = authorization.split(' ')
  // console.log({token,authorization})
  let jwt: any = await verifyJwtToken(token);
  // console.log(jwt)
  if (!jwt) {
    return {
      message: "some things went wrong.",
      success: false,
    }
  }

  //  let user =  await  getUserById(jwt);
  return {
    success : true,
    _id : jwt
  }
  // return authorization
  // context.request.user = "ashish";

}

export const roleMiddleware = async (req: NextRequest) => {
  try {
    const authorization = await req.headers.get("authorization");
    if (!authorization) {

      return NextResponse.json({
        message: "authorization required!",
        success: false,
      }, {
        status: 400,
        statusText: "Bad request"
      })
    }
    let jwt: any = await verifyJwtToken(authorization);
    // console.log(jwt);
    if (!jwt) {
      return {
        message: "some things went wrong.",
        success: false,
      }
    }
    let user: any = await getUserById(jwt);
      // console.log(user)
    if (user.role != "superadmin") {
      return{
        message: "user not Allowed",
        success: false
      }
    }
    return {user};
  } catch (error) {
    console.log(error)
  }
}
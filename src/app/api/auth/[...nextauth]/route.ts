import NextAuth from "next-auth/next";
import { authOptions } from "./options";



// signOut: '/admin/login', // Optional: Redirect to login after sign out
// error: '/error', // Optional: Redirect to a custom error page
// verifyRequest: '/verify-request', // Optional: Redirect to a custom verification request page
const handler = NextAuth(authOptions);


export { handler as GET, handler as POST };
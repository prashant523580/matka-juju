import { NextAuthOptions } from "next-auth";
import Credential from "next-auth/providers/credentials";
import GoogleProviders from "next-auth/providers/google"
import jwt from "jsonwebtoken";
import connectToMongodb from "@/utils/db/dbcon";
import { getUserById, loginCheckUser } from "@/controllers/user";
import User from "@/models/user";
import { signJwtToken } from "@/libs/jwt";
export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    secret: process.env.JWT_SECRET,
    providers: [
        GoogleProviders({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            profile(profile) {
                let userRole = "Google User";
                if (profile?.email.endsWith("@admin.com")) {
                    userRole = "admin"
                } else if (profile?.email.endsWith("@gmail.com")) {
                    userRole = "user"
                }
                return {
                    ...profile,
                    id: profile.sub,
                    role: userRole
                }
            }
        }),
        Credential({
            name: "credential",
            credentials: { email: "", password: "" } as any,
            //@ts-ignore
            async authorize(credentials, req) {
                await connectToMongodb();
                const { email, password } = credentials as { email: string, password: string };
                // console.log(email, password)
                if (!email || !password) throw new Error("Please fill all input fields.")
                let { user, success, message }: any = await loginCheckUser(email, password);
                if (success === false) {
                    throw new Error(message)
                }
                // console.log({user})
                // if (user.role === "client" || user.role === "client") {
                //     throw new Error("Somethings wents wrongs,:")
                // }
                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image.src,
                    role: user.role,
                    _id: user._id,
                    ...user,
                    // socialLinks: user.socialLinks,
                    // phone:user.phone

                }
            },

        }),
        // Credential({
        //     name: "Client",
        //     credentials: {

        //     },
        //     authorize: async (credentials) => {
        //         const { email, password } = credentials as { email: string, password: string };
        //         // console.log(email, password)
        //         if (!email || !password) throw new Error("Please fill all input fields.")
        //         await connectToMongodb();
        //         let { user, success, message }: any = await loginCheckUser(email, password);

        //         if (success === false) {
        //             throw new Error(message)
        //         }
        //         if (user.role === "admin" || user.role === "superadmin") {
        //             throw new Error("Somethings wents wrongs,:")
        //         }
        //         return {


        //             id: user._id,
        //             name: user.name,
        //             email: user.email,
        //             image: user.image.src,
        //             role: user.role,
        //             // socialLinks: user.socialLinks,
        //             // phone:user.phone

        //         }
        //     }
        // })
    ],
    callbacks: {

        async signIn(user: any) {
            await connectToMongodb();
            // Check if the user already exists in the database
            // console.log({user})
            const existingUser = await User.findOne({ email: user.user.email });
            // console.log({existingUser})
            if (!existingUser) {
                // User does not exist, so it's a new registration
                // console.log(user)
                const newUser = {
                    email: user.user.email,
                    name: user.user.name,
                    image: user.user.image,
                    // phone:user.user.phone,
                    // Add any other fields you want to store for the user
                    role: 'user', // Set the default role to 'user'

                };

                // Insert the new user into the database
               let createdUser =  await User.create(newUser);

                // Assign roles based on conditions (example: based on email domain)
                if (user.user.email.endsWith('@admin.com')) {
                    await User.updateOne(
                        { email: user.user.email },
                        { $set: { role: 'admin' } }
                    );
                }
                return createdUser
            }
            // console.log({existingUser},"hello")
            // return Promise.resolve(true);
            return existingUser
        },


        async jwt({ token, user, account, profile, isNewUser }) {
            // if(user) token.role = user.role
            // let id = user?.id;
            // console.log(user)
            // token.accessToken = accessToken
            // token.role = user.role
            // console.log({token})

            // Custom JWT token logic
            //   console.log(user.id)
            // console.log({user,token})
            return { ...token, ...user };
            // return token
        },
        // async session({ session, token, user }) {

        //     if (session?.user) session.user.role = token.role
        //     let currUser = await User.findOne({ email: token.email });
        //     session?.user = {...currUser}
        //     let accessToken = signJwtToken(JSON.parse(JSON.stringify(currUser._id)))
        //     session.token = accessToken;

        //     return session
        // },
        async session({ session, token, user }) {
            try {
                // Check if session.user is defined before accessing its properties
                if (session && session.user) {
                    session.user.role = token.role;
                }

                // Find the current user using the provided token
                let currUser = await User.findOne({ email: token.email });

                // If the current user is found, update the session user
                if (currUser) {
                    session.user = { ...(currUser.toJSON() || {}), ...session.user };
                    let accessToken = signJwtToken(JSON.parse(JSON.stringify(currUser._id)));
                    session.token = accessToken;
                }
                // console.log(session)
                return session;
            } catch (error) {
                console.error('Error updating session:', error);
                throw error;
            }
        },

        async redirect({ url, baseUrl }: { url: any, baseUrl: any }) {
            // console.log({url,baseUrl})
            // return url.startsWith(baseUrl) ? url : baseUrl;
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },

    },

    pages: {
        signIn: "/login",
        signOut: "/"
    }
}
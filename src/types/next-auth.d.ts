import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        address?: string,
        company?: string
        id?: string,
        name?: string,
        email?: string,
        image?: user.string,
        role?: string,
        _id?:string
        // accessToken?: string,
    }
}
declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        token:string,
        user?: {
            /** The user's postal address. */
            address?: string,
            company?: string
            id?: string,
            name?: string,
            email?: string,
            image?: user.string,
            role?: string,
            _id?:any
        } & DefaultSession["user"]
    }
    interface User { 
        address?: string,
        company?: string
        id?: string,
        name?: string,
        email?: string,
        image?: string,
        role?: string,
        token?: string,
        _id?:any
    }
    /**
     * Usually contains information about the provider being used
     * and also extends `TokenSet`, which is different tokens returned by OAuth Providers.
     */
    interface Account { }
    /** The OAuth profile returned from your provider */
    interface Profile { }
}
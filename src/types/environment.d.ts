
namespace NodeJS{
    interface ProcessEnv extends  ProcessEnv{
        MONGODB_URL: string,
        MONGODB_NAME: string,
        JWT_SECRET: string,
        NEXTAUTH_URL: string,
        NEXTAUTH_SECRET:string,
        AES_SECRET: string,
        NEXT_PUBLIC_API:string
        NEXT_PUBLIC_URL: string
        GOOGLE_CLIENT_ID:string
        GOOGLE_CLIENT_SECRET:string
    }
}
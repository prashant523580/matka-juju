import jwt from 'jsonwebtoken'

// signing jwt
export function signJwtToken(payload : any, options = {}) {
    const secret : any = process.env.JWT_SECRET;
    const token = jwt.sign(payload, secret, options);
    return token;
}


// verifying jwt
export function verifyJwtToken(token : any) {
    try {
        const secret : any = process.env.JWT_SECRET;
        const payload = jwt.verify(token, secret);
        return payload;
    } catch (error) {
        console.error(error);
        return null;
    }
}
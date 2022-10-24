import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export const googleVerify = async (token: string) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
    });

    const res = ticket.getPayload();

    return {
        email: res?.email,
        name: res?.name
    }

}
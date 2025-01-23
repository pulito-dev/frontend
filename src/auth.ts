import * as jose from "jose"
import { SvelteKitAuth } from "@auth/sveltekit";
import Auth0 from "@auth/sveltekit/providers/auth0";
import { API_URL } from "$lib/server";

export const { handle, signIn, signOut } = SvelteKitAuth({
    providers: [
        Auth0({
            authorization: {
                params: {
                    scope: "openid profile email",
                    prompt: "login"
                }
            },
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                token.idToken = account.id_token
                token.accessToken = account.access_token

                // decode jwt
                const decodedPayload = jose.decodeJwt(account?.id_token)
                token.decodedPayload = decodedPayload
            }

            return token
        },
        async session({session, token}) {
            try{
                session.idToken = token?.idToken
                session.accessToken = token?.accessToken
                session.user = token?.decodedPayload

                console.log(session.idToken)
                console.log(API_URL)
    
                let response = await fetch(`${API_URL}/users/me/`, {
                    headers: {
                        Authorization: `Bearer ${session.idToken}`
                    }
                })
                
                const user = await response.json()
                
                console.log(user)
                
                session.dbUser = user
            }
            catch (error) {
                console.log("SESSION ERR", error);
            }

            return session
        },
    }
})
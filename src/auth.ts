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
            console.log(token)
            console.log(account);
            try {
                if (account) {
                    token.idToken = account.id_token
                    token.accessToken = account.access_token
    
                    // decode jwt
                    const decodedPayload = jose.decodeJwt(account?.id_token)
                    token.decodedPayload = decodedPayload
                }
            }
            catch (error)
            {
                console.log(error)
            } 

            console.log(token);
            console.log(account);

            return token
        },
        async session({session, token}) {
            console.log(session);
            console.log(token);
            try{
                session.idToken = token?.idToken
                session.accessToken = token?.idToken
                session.user = token?.decodedPayload

                // await fetch(`${API_URL}/auth/`, {
                //     headers: {
                //         Authorization: `Bearer ${session.idToken}`
                //     }
                // })

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
                console.log(error);
            }
            console.log(session);
            console.log(token);

            return session
        },
    }
})
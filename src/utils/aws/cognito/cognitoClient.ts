import { Auth, Amplify } from 'aws-amplify';
import { CognitoUser } from '@aws-amplify/auth'


Amplify.configure({
    aws_cognito_region: process.env.REACT_APP_AWS_COGNITO_REGION,
    aws_user_pools_id: process.env.REACT_APP_AWS_COGNITO_USER_POOLS_ID,
    aws_user_pools_web_client_id: process.env.REACT_APP_AWS_COGNITO_USER_POOLS_WEB_CLIENT_ID,
})

class CognitoClient {
    public static async signUp(email: string, password: string, familyName: string, givenName: string, phoneNumber: string): Promise<void> {
        const userAttributes = {
            email,
            family_name: familyName,
            given_name: givenName,
            updated_at: Date.now().toString(),
        }

        if (phoneNumber !== "") {
            Object.assign(userAttributes, {phone_number: phoneNumber})
        }

        await Auth.signUp({
            username: email,
            password,
            attributes: userAttributes,
        });
    }

    public static async confirmSignUp(email: string, code: string): Promise<void> {
        await Auth.confirmSignUp(email, code);
    }

    public static async signIn(email: string, password: string): Promise<CognitoUser> {
        const user: CognitoUser = await Auth.signIn(email, password);
        return user
    }

    public static async signOut(): Promise<void> {
        await Auth.signOut();
    }

    public static async forgotPassword(email: string): Promise<void> {
        await Auth.forgotPassword(email);
    }

    public static async confirmForgotPassword(email: string, code: string, password: string): Promise<void> {
        await Auth.forgotPasswordSubmit(email, code, password);
    }

    public static async fetchJwtToken(): Promise<string> {
        const user = await Auth.currentAuthenticatedUser()
        return user.signInUserSession.accessToken.jwtToken;
    }

    public static async fetchUserEmail(): Promise<string> {
        const user = await Auth.currentAuthenticatedUser()
        return user.attributes.email
    }

    public static async refreshJWTToken(): Promise<string> {
        const session = await Auth.currentSession()
        return session.getAccessToken().getJwtToken()
    }

    public static async isUserSignedIn(): Promise<boolean> {
        const user = await Auth.currentAuthenticatedUser()
        return user !== null
    }

}

export default CognitoClient;
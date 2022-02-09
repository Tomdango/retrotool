import type {
  CognitoUser,
  CognitoUserSession,
  UserData
} from "amazon-cognito-identity-js";
import { Auth, Signer } from "aws-amplify";

export namespace AWSAuth {
  export const getCurrentUser = async () => {
    return Auth.currentAuthenticatedUser() as Promise<CognitoUser>;
  };

  export const getUserSession = (user: CognitoUser) =>
    new Promise<CognitoUserSession>((resolve, reject) => {
      user.getSession((error: Error, session: CognitoUserSession | null) => {
        if (error || session === null) {
          reject(error);
        } else {
          resolve(session);
        }
      });
    });

  export const getCurrentUserInfo = async () => {
    const currentUser = await AWSAuth.getCurrentUser();
    return new Promise<UserData>((resolve, reject) => {
      currentUser.getUserData((error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result);
        } else {
          reject(new Error("No UserData returned from getUserData call"));
        }
      });
    });
  };

  export const getUserToken = async () => {
    const user = await AWSAuth.getCurrentUser();
    const session = await AWSAuth.getUserSession(user);

    return session.getIdToken().getJwtToken();
  };

  export const getSignedUrl = async (originalUrl?: string) => {
    const user = await AWSAuth.getCurrentUser();
    if (!user) throw new Error("No User");

    const credentials = await Auth.currentCredentials();
    const accessInfo = {
      access_key: credentials.accessKeyId,
      secret_key: credentials.secretAccessKey,
      session_token: credentials.sessionToken,
    };

    return Signer.signUrl(originalUrl, accessInfo);
  };

  export const isLoggedIn = async (): Promise<boolean> => {
    try {
      const currentSession = await Auth.currentSession();
      return currentSession.isValid();
    } catch (error: any) {
      if (error !== "No current user") throw error;
      return false;
    }
  };
}

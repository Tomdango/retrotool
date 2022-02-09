import type { UserData } from "amazon-cognito-identity-js";
import { Auth } from "aws-amplify";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AWSAuth } from "../auth/AWSAuth";

type IAuthContext = {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  login: (emailAddress: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  user: UserData;
};

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  isAuthenticating: true,
  login: async () => undefined,
  logout: async () => undefined,
  user: {} as UserData,
});

const useAuth = (): IAuthContext => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData>();

  const onLoad = async () => {
    try {
      const isLoggedIn = await AWSAuth.isLoggedIn();
      if (!isLoggedIn) {
        setIsAuthenticating(false);
        setIsAuthenticated(false);
        return;
      }

      const currentUser = await AWSAuth.getCurrentUserInfo();

      setUser(currentUser);
      setIsAuthenticated(true);
      setIsAuthenticating(false);
    } catch (e) {
      setIsAuthenticated(false);
      setIsAuthenticating(false);
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  const login = async (emailAddress: string, password: string) => {
    try {
      await Auth.signIn(emailAddress, password);
      const currentUser = await AWSAuth.getCurrentUserInfo();
      setUser(currentUser);
      setIsAuthenticated(true);
    } catch (error: any) {
      console.warn(error);
      setIsAuthenticated(false);
      throw error;
    }
  };

  const logout = async () => {
    await Auth.signOut();
    setIsAuthenticated(false);
  };

  return {
    isAuthenticating,
    isAuthenticated,
    login,
    logout,
    user: user as UserData,
  };
};

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useAuth();

  return auth.isAuthenticating ? null : (
    <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
  );
};

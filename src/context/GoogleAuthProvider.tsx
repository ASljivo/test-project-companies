import React, { createContext, useContext } from "react";
import { useGoogleLogin } from "react-use-googlelogin";
import { GoogleUser, TokenObj } from "react-use-googlelogin/dist/types";

const GoogleAuthContext = createContext({
  isInitialized: false,
  isSignedIn: false,
  signIn: async (options?: any): Promise<GoogleUser | undefined> => {
    return undefined;
  },
  signOut: async (): Promise<boolean> => {
    return true;
  },
  grantOfflineAccess: async (options?: any): Promise<string | undefined> => {
    return "";
  },
  refreshUser: async (): Promise<TokenObj | undefined> => {
    return undefined;
  },
});

export const GoogleAuthProvider = ({ children }: any) => {
  const googleAuth = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID || "",
  });

  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => useContext(GoogleAuthContext);

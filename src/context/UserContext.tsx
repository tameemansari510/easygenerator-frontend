import React from "react";
import { UserAuthProps } from "../types";

export interface UserContexProps {
  isSignUpFromLogin: boolean;
  setIsSignUpFromLogin: (isSignUpFromLogin: boolean) => void;
  userAuth: UserAuthProps;
  setUserAuth: (userAuth: UserAuthProps) => void;
  isTokenExpired: boolean;
  setIsTokenExpired: (isTokenExpired: boolean) => void;
  userSessionExpiredMsg: string;
  setUserSessionExpiredMsg: (userSessionExpiredMsg: string) => void;
}

const UserContext = React.createContext<UserContexProps | null>(null);
export default UserContext;

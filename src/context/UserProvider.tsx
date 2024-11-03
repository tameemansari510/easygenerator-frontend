import { useState } from "react";
import UserContext from "./UserContext";
import { UserAuthProps } from "../types";
interface UserProviderProps {
  children: React.ReactNode;
}

function UserProvider({ children }: UserProviderProps) {
  const [isSignUpFromLogin, setIsSignUpFromLogin] = useState<boolean>(false);
  const [userAuth, setUserAuth] = useState<UserAuthProps>({});
  const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
  const [userSessionExpiredMsg, setUserSessionExpiredMsg] =
    useState<string>("");

  return (
    <UserContext.Provider
      value={{
        isSignUpFromLogin,
        setIsSignUpFromLogin,
        userAuth,
        setUserAuth,
        isTokenExpired,
        setIsTokenExpired,
        userSessionExpiredMsg,
        setUserSessionExpiredMsg,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };

import { ErrorProps } from "../types";

export const validateUserName = (
  userName: string | undefined,
  errors: ErrorProps
) => {
  if (!userName) {
    errors.username = "Username is required";
    errors.usernameInvalid = true;
  }
  return errors;
};

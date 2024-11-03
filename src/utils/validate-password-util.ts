import { PASSWORD_REGEX } from "../constants";
import { ErrorProps } from "../types";

export const validatePassword = (
  password: string | undefined,
  errors: ErrorProps
) => {
  errors.password = [];
  if (!password) {
    errors.password.push("Password is required");
  } else if (!PASSWORD_REGEX.test(password)) {
    errors.password?.push("Password must be minimum of 8 characters");
    errors.password?.push("Password must contain atleast 1 letter");
    errors.password?.push("Password must contain atleast 1 number");
    errors.password?.push("Password must contain atleast 1 symbol");
  }
  if (errors.password && errors.password?.length > 0) {
    errors.passwordInvalid = true;
  }
  return errors;
};

import { EMAIL_REGEX } from "../constants/regex.constants";
import { ErrorProps } from "../types";

export const validateEmail = (
  email: string | undefined,
  errors: ErrorProps
) => {
  if (!email) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = "This is not a valid email format";
  }
  if (errors.email) {
    errors.emailInvalid = true;
  }
  return errors;
};

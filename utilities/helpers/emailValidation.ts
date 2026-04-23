import { EMAIL_REGEX, EMAIL_REGEX_GENERIC } from "../constants/regex";

const isValidEmail = (email: string): boolean => {
  if (typeof email !== "string") {
    return false;
  }

  // return EMAIL_REGEX.test(email.toLowerCase());
  return EMAIL_REGEX_GENERIC.test(email.toLowerCase());
};

export default isValidEmail;

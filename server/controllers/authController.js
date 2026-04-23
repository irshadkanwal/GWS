import * as auth from "@handlers/auth";

async function loginUser(credentials) {
  return await auth.loginUser(credentials);
}

export { loginUser };

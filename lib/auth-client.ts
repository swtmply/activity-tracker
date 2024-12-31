import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

export const authClient = createAuthClient({});

export const signInWithGithub = async () => {
  return await authClient.signIn.social({
    provider: "github",
    callbackURL: "/dashboard",
  });
};
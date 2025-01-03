import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react
import { redirect } from "next/navigation";

export const authClient = createAuthClient({});

export const signInWithGithub = async () => {
  return await authClient.signIn.social({
    provider: "github",
    callbackURL: "/dashboard",
  });
};

export const signInWithGoogle = async () => {
  return await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
  });
};

export const signOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        redirect("/login");
      },
    },
  });
};

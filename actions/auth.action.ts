"use server";

import { cookies } from "next/headers";

export const createAuthCookie = async (username: string) => {
  cookies().set("userAuth", username, {
    secure: true,
    httpOnly: true,
    path: "/",
    sameSite: "strict",
  });
};

export const deleteAuthCookie = async () => {
  cookies().delete("userAuth");
};

"use server";

import { cookies } from "next/headers";

import { SignJWT, jwtVerify } from "jose";



import getErrorMessage from "../getErrorMessage";
import axiosInstance from "../axiosInstance";
import { UserType } from "@/types/user";


const SESSION_NAME = "ATIKELTTERA-ADMIN";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export interface ICredentials {
  email: string;
  password: string;
  role?: string;
}

let storeEmail: string = "";
export async function setEmail(email: string) {
  storeEmail = email; // Set the value asynchronously
}

export async function getEmail() {
  return storeEmail; // Retrieve the value asynchronously
}

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function get_session() {
  const session = cookies().get(SESSION_NAME)?.value;
  if (!session) return null;

  return await decrypt(session);
}

export async function signUp(credentials: Partial<UserType>) {
  try {
    const response = await axiosInstance.post("adminusers/signup", credentials);
    console.log("response for signup", response);
    storeEmail = response.data.email;

    return { ok: true, message: "You have successfully Signed up።" };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}
export async function signIn(credentials: ICredentials) {
  try {
    console.log("data send", credentials);
    const response = await axiosInstance.post("adminusers/login", credentials);
 
    const sessionId = response.data.token;
    const role = response.data.role;

    console.log("response ", response.data);
    const expires = Date.now() + 24 * 60 * 60 * 1000;
    const session = await encrypt({ sessionId, expires, role });

    cookies().set(SESSION_NAME, session, {
      expires: expires,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    return {
      ok: true,
      message: "Wellcome to Atikeltera Admin page",
      data: response.data,
    };
  } catch (error: any) {
    return { ok: false, message: getErrorMessage(error) };
  }
}

export async function signOut() {
  try {
    // await axiosInstance.get("auth/logout/");

    cookies().set(SESSION_NAME, "", { expires: new Date(0) });
  } catch (error: any) {
    throw getErrorMessage(error);
  }
}

export async function get_user() {
  try {
    const response = await axiosInstance.get("auth/me/");
    const data = await response.data;
    return data.data;
  } catch (error: any) {
    throw getErrorMessage(error);
  }
}

export async function forgotPassword(email: string) {
  try {
    const response = await axiosInstance.post("/auth/forgot-password/", {
      email,
    });
    await setEmail(email);
    console.log(storeEmail);
    return { ok: true, message: response.data };
  } catch (error: any) {
    console.log("failed");
    return {
      ok: false,
      message: getErrorMessage(error),
    };
  }
}

export async function resetPassword(
  newPassword: string,
  confirmPassword: string
) {
  const email: string = await getEmail();
  if (newPassword !== confirmPassword) {
    return { ok: false, message: "Passwords do not match" };
  }

  try {
    const response = await axiosInstance.post("/auth/reset-password/", {
      new_password: newPassword,
      email,
    });
    return { ok: true, message: response.data };
  } catch (error: any) {
    return {
      ok: false,
      message: getErrorMessage(error),
    };
  }
}

export async function sendOTP(email: string) {
  try {
    console.log("Sending OTP:", email);
    const response = await axiosInstance.post("/verification/send-otp/", {
      email,
    });
    console.log("response", response.data);
    await setEmail(email);
    return { ok: true, message: response.data.message };
  } catch (error: any) {
    console.log("failed");
    return {
      ok: false,
      message: getErrorMessage(error),
    };
  }
}

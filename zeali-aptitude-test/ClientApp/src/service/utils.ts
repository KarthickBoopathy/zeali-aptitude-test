import { get, post } from "./api";
import { ZealiUsers } from "../types/schema";

export const authorize = () => get("/ZealiAptitude/Authorize");

export const getAptitudeQuestions = () => get("/ZealiAptitude");

export const saveTestResults = (latestScore: number) =>
  post("/ZealiAptitude/SaveTest", latestScore);

export const loginZeali = (data: ZealiUsers) => post("/Signin", data);

export const verifyExistingUserOTP = (data: ZealiUsers) =>
  post("/Signin/VerifyOTP", data);

export const userChangePassword = (data: ZealiUsers) =>
  post("/Signin/ChangePassword", data);

export const logout = () => get("/Signin/Logout");

export const registerNewZealiUsers = (data: ZealiUsers) =>
  post("/Signup", data);

export const generateForgotPasswordOTP = (data: ZealiUsers) =>
  post("/Signup/Login/OTP", data);

export const generateSignUpOTP = (data: ZealiUsers) =>
  post("/Signup/Signup/OTP", data);

export const verifyNewUserOTP = (data: ZealiUsers) =>
  post("/Signup/VerifyNewOTP", data);

export const getZealiUserInfo = () => get("/Dashboard/ZealiUserInfo");

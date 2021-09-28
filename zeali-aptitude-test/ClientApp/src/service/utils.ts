import { get, post } from "./api";
import { ZealiUsers } from "../types/schema";

export const authorize = (): Promise<any> => {
  return get("/ZealiAptitude/Authorize");
};

export const getAptitudeQuestions = (): Promise<any> => {
  return get("/ZealiAptitude");
};

export const saveTestResults = (latestScore: number) => {
  return post("/ZealiAptitude/SaveTest", latestScore);
};

export const loginZeali = async (data: ZealiUsers) => {
  return post("/Signin", data);
};

export const verifyExistingUserOTP = async (data: ZealiUsers) => {
  return post("/Signin/VerifyOTP", data);
};

export const userChangePassword = (data: ZealiUsers) => {
  return post("/Signin/ChangePassword", data);
};

export const logout = (): Promise<any> => {
  return get("/Signin/Logout");
};

export const registerNewZealiUsers = async (data: ZealiUsers) => {
  return post("/Signup", data);
};

export const generateForgotPasswordOTP = async (data: ZealiUsers) => {
  return post("/Signup/Login/OTP", data);
};

export const generateSignUpOTP = async (data: ZealiUsers) => {
  return post("/Signup/Signup/OTP", data);
};

export const verifyNewUserOTP = async (data: ZealiUsers) => {
  return post("/Signup/VerifyNewOTP", data);
};

export const getZealiUserInfo = () => {
  return get("/Dashboard/ZealiUserInfo");
};

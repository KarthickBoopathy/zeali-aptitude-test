import { get, post } from "./api";
import { ZealiUsers } from "../types/schema";

export const authorize = (): Promise<any> => {
  return get("/api/zealiAptitudeTest/ZealiAptitude/Authorize");
};

export const getAptitudeQuestions = (): Promise<any> => {
  return get("/api/zealiAptitudeTest/ZealiAptitude");
};

export const saveTestResults = (latestScore: number) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude/SaveTest", latestScore);
};

export const loginZeali = async (data: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/Signin", data);
};

export const verifyExistingUserOTP = async (data: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/Signin/VerifyOTP", data);
};

export const userChangePassword = (data: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/Signin/ChangePassword", data);
};

export const logout = (): Promise<any> => {
  return get("/api/zealiAptitudeTest/Signin/Logout");
};

export const registerNewZealiUsers = async (data: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/Signup", data);
};

export const generateForgotPasswordOTP = async (data: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/Signup/Login/OTP", data);
};

export const generateSignUpOTP = async (data: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/Signup/SignUp/OTP", data);
};

export const verifyNewUserOTP = async (data: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/Signup/VerifyNewOTP", data);
};

export const getZealiUserInfo = () => {
  return get("/api/zealiAptitudeTest/Dashboard/ZealiUserInfo");
};




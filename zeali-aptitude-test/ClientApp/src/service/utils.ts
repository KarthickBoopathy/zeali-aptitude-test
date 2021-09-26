import { get, post } from "./api";
import { ZealiUsers } from "../types/schema";

export const getAptitudeQuestions = (): Promise<any> => {
  return get("/api/zealiAptitudeTest/ZealiAptitude");
};

export const loginZeali = async (data: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude/Login", data);
};

export const registerNewZealiUsers = async (data: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude", data);
};

export const generateForgotPasswordOTP = async (data: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude/Login/OTP", data);
};

export const generateSignUpOTP = async (data: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude/SignUp/OTP", data);
};

export const verifyExistingUserOTP = async (data: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude/VerifyOTP", data);
};

export const verifyNewUserOTP = async (data: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude/VerifyNewOTP", data);
};

export const userChangePassword = (data: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude/ChangePassword", data);
};

export const getZealiUserInfo = () => {
  return get("/api/zealiAptitudeTest/ZealiAptitude/ZealiUserInfo");
};

export const saveTestResults = (latestScore: number) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude/SaveTest", latestScore);
};

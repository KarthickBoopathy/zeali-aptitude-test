import { get, post } from "./api";
import { ZealiUsers } from "../types/schema";

export const getAptitudeQuestions = (): Promise<any> => {
  return get("/api/zealiAptitudeTest/ZealiAptitude");
};

export const loginZeali = async (userDetails: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude/Login", userDetails);
};

export const registerNewZealiUsers = async (userDetails: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude", userDetails);
};

export const generateForgotPasswordOTP = async (userDetails: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude/Login/OTP", userDetails);
};

export const generateSignUpOTP = async (userDetails: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude/SignUp/OTP", userDetails);
};

export const userChangePassword = (userDetails: ZealiUsers) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude/ChangePassword", userDetails);
};

export const getZealiUserInfo = () => {
  return get("/api/zealiAptitudeTest/ZealiAptitude/ZealiUserInfo");
};

export const saveTestResults = (latestScore: number) => {
  return post("/api/zealiAptitudeTest/ZealiAptitude/SaveTest", latestScore);
};

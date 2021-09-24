import { ZealiUsers } from "../types/schema";

export const getAptitudeQuestions = (): Promise<any> => {
  const headers = { "Content-Type": "application/json" };

  return fetch("/api/zealiAptitudeTest/ZealiAptitude", {
    headers,
  }).then((response) => {
    if (response) {
      return response.json();
    }
  });
};

export const loginZeali = async (userDetails: ZealiUsers) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  };
  return await fetch(
    "/api/zealiAptitudeTest/ZealiAptitude/Login",
    requestOptions
  ).then((response) => response.json());
};

export const registerNewZealiUsers = async (userDetails: ZealiUsers) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  };
  return await fetch(
    "/api/zealiAptitudeTest/ZealiAptitude",
    requestOptions
  ).then((response) => response.json());
};

export const generateForgotPasswordOTP = async (userDetails: ZealiUsers) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  };
  return await fetch(
    "/api/zealiAptitudeTest/ZealiAptitude/Login/OTP",
    requestOptions
  ).then((response) => response.json());
};

export const generateSignUpOTP = async (userDetails: ZealiUsers) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  };
  return await fetch(
    "/api/zealiAptitudeTest/ZealiAptitude/SignUp/OTP",
    requestOptions
  ).then((response) => response.json());
};

export const userChangePassword = async (userDetails: ZealiUsers) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  };
  return await fetch(
    "/api/zealiAptitudeTest/ZealiAptitude/ChangePassword",
    requestOptions
  ).then((response) => response.json());
};

export const saveTestResults = (email: string, latestScore: number) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, latestScore }),
  };
  return fetch(
    "/api/zealiAptitudeTest/ZealiAptitude/SaveTest",
    requestOptions
  ).then((response) => response.json());
};

export const getZealiUserInfo = (email: string) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(email),
  };
  return fetch(
    "/api/zealiAptitudeTest/ZealiAptitude/ZealiUserInfo",
    requestOptions
  ).then((response) => response.json());
};

export const exportLocalStorage = () => {
  return (
    localStorage?.getItem("loginStatus") &&
    JSON.parse(localStorage?.getItem("loginStatus") ?? "")
  );
};

export const setLocalStorageLoginStatus = (data: any) => {
  localStorage?.setItem("loginStatus", JSON.stringify(data));
};

export const getLoginStatus = () => {
  return (
    localStorage?.getItem("loginStatus") &&
    JSON.parse(localStorage?.getItem("loginStatus") ?? "")?.isLoggedIn
  );
};

import { ZealiUsers } from "./types/schema";

// export const loginZeali = (userDetails: ZealiUsers) => {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userDetails),
//   };
//  fetch("/api/zealiAptitudeTest/ZealiAptitude/Login", requestOptions)
//     .then((response) => response.json())
//     .then((data) => {
//       localStorage?.setItem("loginStatus", JSON.stringify(data));
//     });

// };

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

// export const registerNewZealiUsers = (userDetails: ZealiUsers) => {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(userDetails),
//   };
//   fetch("/api/zealiAptitudeTest/ZealiAptitude", requestOptions)
//     .then((response) => response.json())
//     .then((data) => {
//       localStorage?.setItem("loginStatus", JSON.stringify(data));
//       // return data?.isLoggedIn;
//     });

//     return localStorage?.getItem("loginStatus")&&JSON.parse(localStorage?.getItem("loginStatus") ?? "")?.isLoggedIn;
// };

export const exportLocalStorage = () => {
  return (
    localStorage?.getItem("loginStatus") &&
    JSON.parse(localStorage?.getItem("loginStatus") ?? "")
  );
};

export const getLoginStatus = () => {
  return (
    localStorage?.getItem("loginStatus") &&
    JSON.parse(localStorage?.getItem("loginStatus") ?? "")?.isLoggedIn
  );
};

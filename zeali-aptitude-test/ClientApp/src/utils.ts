import { ZealiUsers } from "./types/schema";

export const loginZeali = (userDetails: ZealiUsers) => {
  console.log(userDetails);
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  };
  fetch("/api/zealiAptitudeTest/ZealiAptitude/Login", requestOptions)
    .then((response) => response.json())
    .then((data) => localStorage.setItem("loginStatus", JSON.stringify(data)));
};

export const registerNewZealiUsers = (userDetails: ZealiUsers)=> {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userDetails),
  };
  fetch("/api/zealiAptitudeTest/ZealiAptitude", requestOptions)
  .then((response) => response.json())
  .then((data) => localStorage.setItem("loginStatus", JSON.stringify(data)));
};

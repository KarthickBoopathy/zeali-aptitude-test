import ls from "localstorage-slim";

export const setLocalStorageLoginStatus = (data: any) => {
  ls.set("loginStatus", data, { encrypt: true, secret: 972 });
};

export const getStorageDataOf = (prop: any) => {
  const storage: any = ls.get("loginStatus", { decrypt: true, secret: 972 });
  if (prop !== "isLoggedIn") {
    return storage ? storage[prop] : reloadApplication();
  } else {
    return storage && storage[prop];
  }
};

export const reloadApplication = () => {
  localStorage.clear();
  window.location.href = "/";
};

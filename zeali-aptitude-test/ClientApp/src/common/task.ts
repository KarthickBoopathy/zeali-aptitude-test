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
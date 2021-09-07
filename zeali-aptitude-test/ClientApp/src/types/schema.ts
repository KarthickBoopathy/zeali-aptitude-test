export type ZealiUsers = {
    email?: string;
    password?: string;
    isSubscribed?: boolean;
    
}


export type ErrorMessage = {
    error?: boolean,
    message?: string,
  };

  export type zealiLoginAuth = {
    email?: string;
    isLoggedIn?: boolean;
    errorMessage?: string,
  };
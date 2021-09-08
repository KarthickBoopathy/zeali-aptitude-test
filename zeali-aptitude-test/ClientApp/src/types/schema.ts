export type ZealiUsers = {
    email?: string;
    password?: string;
    isSubscribed?: boolean;
    
}

export type ErrorMessage = {
    passwordError?: boolean,
    createPasswordError?: boolean,
    confirmPasswordError?: boolean,
    passwordMessage?: string,
    createPasswordMessage?: string
    confirmPasswordMessage?: string
  };

export type ZealiUsers = {
  email?: string;
  password?: string;
  username?:string;
  isSubscribed?: boolean;
};

export type ErrorMessage = {
  emailError?: boolean;
  passwordError?: boolean;
  createPasswordError?: boolean;
  confirmPasswordError?: boolean;
  otpError?:boolean;
  emailMessage?: string;
  passwordMessage?: string;
  createPasswordMessage?: string;
  confirmPasswordMessage?: string;
  otpMessage?:string;
};

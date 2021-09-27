export type ZealiUsers = {
  email?: string;
  password?: string;
  username?: string;
  otp?:string;
  isSubscribed?: boolean;
  signUpDate?: string;
  isTrialOver?: boolean;
  performance?: Performance[];
  highScore?: number;
  latestScore?: number;
  star?: any;
};

export type Performance = {
  test?: string;
  score?: number;
};

export type Error = {
  errorCode?: number;
  emailError?: any;
  passwordError?: any;
  otpError?: any;
};

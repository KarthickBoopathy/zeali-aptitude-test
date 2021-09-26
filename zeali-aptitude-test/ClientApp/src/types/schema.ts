export type ZealiUsers = {
  email?: string;
  password?: string;
  username?: string;
  isSubscribed?: boolean;
  signUpDate?: string;
  isTrialOver?: boolean;
  performance?: Performance[];
  highScore?: number;
  latestScore?: number;
  star?: any;
};

export type ErrorMessage = {
  isLoggedIn?:boolean;
  emailError?: boolean;
  passwordError?: boolean;
  createPasswordError?: boolean;
  confirmPasswordError?: boolean;
  otpError?: boolean;
  emailMessage?: string;
  passwordMessage?: string;
  createPasswordMessage?: string;
  confirmPasswordMessage?: string;
  otpMessage?: string;
};

export type Performance = {
  test?: string;
  score?: number;
};

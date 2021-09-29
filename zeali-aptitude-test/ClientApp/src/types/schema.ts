export type ZealiUsers = {
  email?: string;
  password?: string;
  username?: string;
  otp?: string;
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

export type AptitudeQuestion = {
  questionID?: string;
  topic?: string;
  question?: string;
  optionA?: string;
  optionB?: string;
  optionC?: string;
  optionD?: string;
  answer?: string;
  userAnswer?: string;
};

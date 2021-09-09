export type ZealiUsers = {
  email?: string;
  password?: string;
  isSubscribed?: boolean;
};

export type ErrorMessage = {
  emailError?: boolean;
  passwordError?: boolean;
  createPasswordError?: boolean;
  confirmPasswordError?: boolean;
  emailMessage?: string;
  passwordMessage?: string;
  createPasswordMessage?: string;
  confirmPasswordMessage?: string;
};

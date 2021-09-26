using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Helpers
{
    public class ErrorCode: IErrorCode
    {
        public ErrorDTO Error(int errorCode)
        {
            ErrorDTO error = new ErrorDTO();
            error.errorCode = errorCode;

            switch (errorCode)
            {
                case 9001:
                    error.emailError = "User does not Exist. Please click \"New to Zeali?\" to register";
                    break;
                case 9002:
                    error.passwordError = "Incorrect Password";
                    break;
                case 9003:
                    error.emailError = "Already an existing user. Please use different email address";
                    break;
                case 9004:
                    error.otpError = "Incorrect OTP";
                    break;
                case 9005:
                    error.emailError = "Something went wrong. Please try again";
                    break;
            }

            return error;
        }
    }
}

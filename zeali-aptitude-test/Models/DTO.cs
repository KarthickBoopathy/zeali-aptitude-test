using System.Collections.Generic;

namespace zeali_aptitude_test.Models
{


    public class UserValidationDTO
    {
        public string email { get; set; }
        public bool isValid { get; set; }
    }


    public class DashboardDTO
    {
        public string username { get; set; }
        public string email { get; set; }
        public List<Performance> performance { get; set; } = new List<Performance>();
        public int highScore { get; set; }
        public int latestScore { get; set; }
        public double star { get; set; }
    }

    public class SaveTestDTO
    {
        public string email { get; set; }
        public int latestScore { get; set; }
    }

    public class ErrorDTO
    {
        public int errorCode { get; set; }
        public string emailError { get; set; }
        public string passwordError { get; set; }
        public string otpError { get; set; }
    }

    public class ZealiLoginAuthDTO
    {
        public string email { get; set; }
        public string username { get; set; }
        public bool isLoggedIn { get; set; }
        public bool isError { get; set; }
        public bool isTrialOver { get; set; }
        public bool isSubscribed { get; set; }
        public string otp { get; set; }
        public string errorMessage { get; set; }
        public bool emailError { get; set; }
        public bool passwordError { get; set; }
        public bool createPasswordError { get; set; }
        public bool confirmPasswordError { get; set; }
        public bool otpError { get; set; }
        public string emailMessage { get; set; }
        public string passwordMessage { get; set; }
        public string createPasswordMessage { get; set; }
        public string confirmPasswordMessage { get; set; }
        public string otpMessage { get; set; }


    }
}

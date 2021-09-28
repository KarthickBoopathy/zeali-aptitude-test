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

}

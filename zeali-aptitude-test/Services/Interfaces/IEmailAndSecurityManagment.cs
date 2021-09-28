namespace zeali_aptitude_test.Services.Interfaces
{
    public interface IEmailAndSecurityManagment
    {
        string encryptPassword(string password);
        string createOTP();
        bool sendEmail(string email, string userName, string mode, string otp);
    }
}

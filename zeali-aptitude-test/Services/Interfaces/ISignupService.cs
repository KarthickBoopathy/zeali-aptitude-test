using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Services.Interfaces
{
    public interface ISignupService
    {
        int InsertNewZealiUser(ZealiUsers zealiUsers);
        int GenerateOTP(ZealiUsers zealiUsers, string mode);
        int VerifyNewUserOTP(ZealiUsers zealiUsers);
        void RemoveNewUser(string email);

    }
}

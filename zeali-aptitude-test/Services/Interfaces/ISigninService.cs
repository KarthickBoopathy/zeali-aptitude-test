using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Services.Interfaces
{
    public interface ISigninService
    {
        int AuthenticateZealiUsers(ZealiUsers zealiUsers);
        int VerifyOTP(ZealiUsers zealiUsers);
        int ChangePassword(ZealiUsers zealiUsers);

    }
}

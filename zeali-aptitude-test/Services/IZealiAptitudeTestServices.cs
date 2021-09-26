using System.Collections.Generic;
using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Services
{
   public interface IZealiAptitudeTestServices
    {
        List<AptitudeQuestions> GetAptitudeQuestions();
        int InsertNewZealiUser(ZealiUsers zealiUsers);
        int AuthenticateZealiUsers (ZealiUsers zealiUsers);
        int GenerateOTP(ZealiUsers zealiUsers, string mode);
        int VerifyOTP(ZealiUsers zealiUsers);
        int VerifyNewUserOTP(ZealiUsers zealiUsers);
        int ChangePassword(ZealiUsers zealiUsers);
        bool SaveTestDetails(string email, int score);
        DashboardDTO GetDashboardData(string email);
        ZealiUsers FindUser(string email);
        NewUsers FindNewUser(string email);
        bool isUserExist(string email);
        bool isNewUserExist(string email);
        void RemoveNewUser(string email);
        string GenerateJWT(string email);
        string GetIssuer(string jwt);
    }
}

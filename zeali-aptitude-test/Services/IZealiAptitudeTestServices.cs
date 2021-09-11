
using System.Collections.Generic;
using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Services
{
   public interface IZealiAptitudeTestServices
    {
        List<AptitudeQuestions> GetAptitudeQuestions();
        ZealiLoginAuth InsertNewZealiUser(ZealiUsers zealiUsers);
        ZealiLoginAuth authenticateZealiUsers (ZealiUsers zealiUsers);
        ZealiLoginAuth generateOTP(ZealiUsers zealiUsers, string mode);
        ZealiUsers findUsers(ZealiUsers zealiUsers);
    }
}

﻿using System.Collections.Generic;
using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Services
{
   public interface IZealiAptitudeTestServices
    {
        List<AptitudeQuestions> GetAptitudeQuestions();
        ZealiLoginAuthDTO InsertNewZealiUser(ZealiUsers zealiUsers);
        ZealiLoginAuthDTO AuthenticateZealiUsers (ZealiUsers zealiUsers);
        ZealiLoginAuthDTO GenerateOTP(ZealiUsers zealiUsers, string mode);
        ZealiLoginAuthDTO ChangePassword(ZealiUsers zealiUsers);
        bool SaveTestDetails(string email, int score);
        DashboardDTO GetDashboardData(string email);
        ZealiUsers FindUser(string email);
        bool isUserExist(string email);
        string GenerateJWT(string email);
        string GetIssuer(string jwt);
    }
}

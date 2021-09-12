﻿
using System.Collections.Generic;
using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Services
{
   public interface IZealiAptitudeTestServices
    {
        List<AptitudeQuestions> GetAptitudeQuestions();
        ZealiLoginAuth InsertNewZealiUser(ZealiUsers zealiUsers);
        ZealiLoginAuth AuthenticateZealiUsers (ZealiUsers zealiUsers);
        ZealiLoginAuth GenerateOTP(ZealiUsers zealiUsers, string mode);
        ZealiUsers FindUsers(ZealiUsers zealiUsers);
        ZealiLoginAuth ChangePassword(ZealiUsers zealiUsers);
    }
}

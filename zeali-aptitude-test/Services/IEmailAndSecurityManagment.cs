using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace zeali_aptitude_test.Services
{
    public interface IEmailAndSecurityManagment
    {
        string encryptPassword(string password);
        string createOTP();
        bool sendEmail(string email, string userName, string mode, string otp);
    }
}

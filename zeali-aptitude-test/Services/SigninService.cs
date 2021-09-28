using MongoDB.Driver;
using zeali_aptitude_test.Models;
using zeali_aptitude_test.Services.Interfaces;

namespace zeali_aptitude_test.Services
{
    public class SigninService: ISigninService
    {

        private readonly IEmailAndSecurityManagment _emailAndSecurityManagment;
        private readonly IHelper _helper;

        public SigninService(IEmailAndSecurityManagment emailAndSecurityManagment, IHelper helper)
        {
            _emailAndSecurityManagment = emailAndSecurityManagment;
            _helper = helper;
        }

        public int AuthenticateZealiUsers(ZealiUsers zealiUsers)
        {
            try
            {
                ZealiUsers user = _helper.FindUser(zealiUsers.email);
                if ((user.email.ToLower() == zealiUsers.email.ToLower()) && (user.password == _emailAndSecurityManagment.encryptPassword(zealiUsers.password)))
                    return 0;
                else
                    return 9002;
            }
            catch
            {
                return 9005;
            }
        }

        public int VerifyOTP(ZealiUsers zealiUsers)
        {
            try
            {
                ZealiUsers user = _helper.FindUser(zealiUsers.email);
                if (user.otp == _emailAndSecurityManagment.encryptPassword(zealiUsers.otp))
                    return 0;
                else
                    return 9004;
            }
            catch
            {
                return 9005;
            }
        }

        public int ChangePassword(ZealiUsers zealiUsers)
        {
            try
            {
                _helper.UpdateZealiUsers(zealiUsers.email, Builders<ZealiUsers>.Update.Set(z => z.password, _emailAndSecurityManagment.encryptPassword(zealiUsers.password)));
                return 0;
            }
            catch
            {
                return 9005;
            }

        }

    }
}

using MongoDB.Driver;
using zeali_aptitude_test.Data;
using zeali_aptitude_test.Helpers;
using zeali_aptitude_test.Models;
using zeali_aptitude_test.Services.Interfaces;

namespace zeali_aptitude_test.Services
{
    public class SignupService: ISignupService
    {
        private readonly IMongoCollection<ZealiUsers> _zealiUsers;
        private readonly IMongoCollection<NewUsers> _newUsers;
        private readonly IEmailAndSecurityManagment _emailAndSecurityManagment;
        private readonly IHelper _helper;

        public SignupService(IDBClient dBClient, IEmailAndSecurityManagment emailAndSecurityManagment, IHelper helper)
        {
            _zealiUsers = dBClient.GetZealiUsers();
            _newUsers = dBClient.GetNewUsers();
            _emailAndSecurityManagment = emailAndSecurityManagment;
            _helper = helper;
        }

        public int InsertNewZealiUser(ZealiUsers zealiUsers)
        {
            try
            {
                zealiUsers.password = _emailAndSecurityManagment.encryptPassword(zealiUsers.password);
                zealiUsers.otp = _emailAndSecurityManagment.encryptPassword(zealiUsers.otp);
                _zealiUsers.InsertOne(zealiUsers);
                return 0;
            }
            catch
            {
                return 9005;
            }
        }

        public int GenerateOTP(ZealiUsers zealiUsers, string mode)
        {
            try
            {
                string otp = _emailAndSecurityManagment.createOTP();
                var result = _emailAndSecurityManagment.sendEmail(zealiUsers.email, zealiUsers.username, mode, otp);
                if (result)
                {
                    otp = _emailAndSecurityManagment.encryptPassword(otp);
                    if (mode == "Login")
                        _helper.UpdateZealiUsers(zealiUsers.email, Builders<ZealiUsers>.Update.Set(z => z.otp, otp));
                    if (mode == "SignUp")
                    {
                        if (_helper.isNewUserExist(zealiUsers.email))
                        {
                            _helper.UpdateNewUsers(zealiUsers.email, Builders<NewUsers>.Update.Set(z => z.otp, otp));
                        }
                        else
                        {
                            NewUsers newUsers = new NewUsers();
                            newUsers.email = zealiUsers.email;
                            newUsers.username = zealiUsers.username;
                            newUsers.otp = otp;
                            _newUsers.InsertOne(newUsers);
                        }
                    }
                    return 0;
                }
                else
                    return 9005;
            }
            catch
            {
                return 9005;
            }
        }



        public int VerifyNewUserOTP(ZealiUsers zealiUsers)
        {
            try
            {
                NewUsers user = _helper.FindNewUser(zealiUsers.email);
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

        public void RemoveNewUser(string email)
        {
            _newUsers.DeleteOne(user => user.email.ToLower() == email.ToLower());
        }



    }
}

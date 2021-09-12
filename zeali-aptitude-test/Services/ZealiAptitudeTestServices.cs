using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;

using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Services
{
    public class ZealiAptitudeTestServices : IZealiAptitudeTestServices
    {
        private readonly IMongoCollection<AptitudeQuestions> _aptitudeQuestions;

        private readonly IMongoCollection<ZealiUsers> _zealiUsers;

        private readonly IEmailAndSecurityManagment _emailAndSecurityManagment;


        public ZealiAptitudeTestServices(IDBClient dBClient, IEmailAndSecurityManagment emailAndSecurityManagment)
        {
            _aptitudeQuestions = dBClient.GetAptitudeQuestionsCollection();
            _zealiUsers = dBClient.GetZealiUsers();
            _emailAndSecurityManagment = emailAndSecurityManagment;

        }



        public List<AptitudeQuestions> GetAptitudeQuestions()
        {
            List<AptitudeQuestions> allAptitudeQuestions = _aptitudeQuestions.Find(questions => true).ToList().OrderBy(i => Guid.NewGuid()).ToList();
            List<AptitudeQuestions> currentTestQuestions = new List<AptitudeQuestions>();
            int count = 0;
            foreach (AptitudeQuestions app in allAptitudeQuestions)
            {
                count = count + 1;
                if (count <= 20)
                {
                    currentTestQuestions.Add(app);

                }
            }

            return currentTestQuestions;
        }

        public ZealiLoginAuth InsertNewZealiUser(ZealiUsers zealiUsers)
        {

            ZealiLoginAuth zealiLoginAuth = new ZealiLoginAuth();

            try
            {
                if (FindUsers(zealiUsers) == null)
                {
                    zealiUsers.password = _emailAndSecurityManagment.encryptPassword(zealiUsers.password);
                    _zealiUsers.InsertOne(zealiUsers);
                    zealiLoginAuth.email = zealiUsers.email;
                    zealiLoginAuth.username = zealiUsers.username;
                    zealiLoginAuth.isLoggedIn = true;

                }
                else
                {
                    zealiLoginAuth.email = zealiUsers.email;
                    zealiLoginAuth.isLoggedIn = false;
                    zealiLoginAuth.emailError = true;
                    zealiLoginAuth.emailMessage = "Already an existing user. Please use different email address";
                }

                return zealiLoginAuth;
            }
            catch
            {
                zealiLoginAuth.email = zealiUsers.email;
                zealiLoginAuth.isLoggedIn = false;
                zealiLoginAuth.emailError = true;
                zealiLoginAuth.errorMessage = "Something went wrong. Please try again";
                return zealiLoginAuth;
            }


        }

        public ZealiLoginAuth AuthenticateZealiUsers(ZealiUsers zealiUsers)
        {
            ZealiLoginAuth zealiLoginAuth = new ZealiLoginAuth();

            try
            {
                ZealiUsers zealiUsers_temp = FindUsers(zealiUsers);
                if (zealiUsers_temp != null)
                {
                    if ((zealiUsers_temp.email == zealiUsers.email) && (zealiUsers_temp.password == _emailAndSecurityManagment.encryptPassword(zealiUsers.password)))
                    {
                        zealiLoginAuth.email = zealiUsers_temp.email;
                        zealiLoginAuth.username = zealiUsers_temp.username;
                        zealiLoginAuth.isLoggedIn = true;
                    }
                    else
                    {
                        zealiLoginAuth.email = zealiUsers.email;
                        zealiLoginAuth.isLoggedIn = false;
                        zealiLoginAuth.passwordError = true;
                        zealiLoginAuth.passwordMessage = "Incorrect Password";
                    }
                }
                else
                {
                    zealiLoginAuth.email = zealiUsers.email;
                    zealiLoginAuth.isLoggedIn = false;
                    zealiLoginAuth.emailError = true;
                    zealiLoginAuth.emailMessage = "User does not Exist. Please click \"New to Zeali?\" to register";

                }


                return zealiLoginAuth;
            }
            catch
            {
                zealiLoginAuth.email = zealiUsers.email;
                zealiLoginAuth.isLoggedIn = false;
                zealiLoginAuth.emailError = true;
                zealiLoginAuth.emailMessage = "Something went wrong. Please try again";
                return zealiLoginAuth;
            }
        }



        public ZealiLoginAuth GenerateOTP(ZealiUsers zealiUsers, string mode)
        {
            ZealiLoginAuth zealiLoginAuth = new ZealiLoginAuth();
            string otp = _emailAndSecurityManagment.createOTP();
            var result = _emailAndSecurityManagment.sendEmail(zealiUsers.email, zealiUsers.username, mode, otp);
            if (result)
            {
                zealiLoginAuth.otp = otp;
            }
            else
            {
                zealiLoginAuth.isLoggedIn = false;
                zealiLoginAuth.emailError = true;
                zealiLoginAuth.emailMessage = "Something went wrong. Please try again";
            }
            return zealiLoginAuth;
        }

        public ZealiLoginAuth ChangePassword(ZealiUsers zealiUsers)
        {
            ZealiLoginAuth zealiLoginAuth = new ZealiLoginAuth();
            try
            {
                ZealiUsers zealiUsers_temp = FindUsers(zealiUsers);
                if (FindUsers(zealiUsers) != null)
                {
                    var filterDefinition = Builders<ZealiUsers>.Filter.Eq(z => z.email, zealiUsers.email);
                    var updateDefinition = Builders<ZealiUsers>.Update.Set(z => z.password, zealiUsers.password);
                    var options = new UpdateOptions { IsUpsert = true };
                    _zealiUsers.UpdateOne(filterDefinition, updateDefinition, options);
                    zealiLoginAuth.isPasswordChangedSuccessfully = true;
                    return zealiLoginAuth;
                }
                else
                {
                    zealiLoginAuth.email = zealiUsers.email;
                    zealiLoginAuth.isLoggedIn = false;
                    zealiLoginAuth.emailError = true;
                    zealiLoginAuth.isPasswordChangedSuccessfully = false;
                    zealiLoginAuth.emailMessage = "User does not Exist. Please click \"New to Zeali?\" to register";

                    return zealiLoginAuth;

                }
            }
            catch
            {
                zealiLoginAuth.isLoggedIn = false;
                zealiLoginAuth.emailError = true;
                zealiLoginAuth.isPasswordChangedSuccessfully = false;
                zealiLoginAuth.emailMessage = "Something went wrong. Please try again";
                return zealiLoginAuth;
            }
          
        }

        public ZealiUsers FindUsers(ZealiUsers zealiUsers)
        {
            return _zealiUsers.Find(user => user.email == zealiUsers.email).FirstOrDefault();
        }

    }
}

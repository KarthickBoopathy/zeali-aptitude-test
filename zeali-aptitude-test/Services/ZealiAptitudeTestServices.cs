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

        public ZealiLoginAuthDTO InsertNewZealiUser(ZealiUsers zealiUsers)
        {
            ZealiLoginAuthDTO zealiLoginAuth = new ZealiLoginAuthDTO();
            try
            {
                if (FindUser(zealiUsers.email) == null)
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

        public ZealiLoginAuthDTO AuthenticateZealiUsers(ZealiUsers zealiUsers)
        {
            ZealiLoginAuthDTO zealiLoginAuth = new ZealiLoginAuthDTO();
            try
            {
                ZealiUsers zealiUsers_temp = FindUser(zealiUsers.email);
                if (zealiUsers_temp != null)
                {
                    if ((zealiUsers_temp.email.ToLower() == zealiUsers.email.ToLower()) && (zealiUsers_temp.password == _emailAndSecurityManagment.encryptPassword(zealiUsers.password)))
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



        public ZealiLoginAuthDTO GenerateOTP(ZealiUsers zealiUsers, string mode)
        {
            ZealiLoginAuthDTO zealiLoginAuth = new ZealiLoginAuthDTO();
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

        public ZealiLoginAuthDTO ChangePassword(ZealiUsers zealiUsers)
        {
            ZealiLoginAuthDTO zealiLoginAuth = new ZealiLoginAuthDTO();
            try
            {
                ZealiUsers zealiUsers_temp = FindUser(zealiUsers.email);
                if (FindUser(zealiUsers.email) != null)
                {
                    var filterDefinition = Builders<ZealiUsers>.Filter.Eq(z => z.email.ToLower(), zealiUsers.email.ToLower());
                    var updateDefinition = Builders<ZealiUsers>.Update.Set(z => z.password, _emailAndSecurityManagment.encryptPassword(zealiUsers.password));
                    var options = new UpdateOptions { IsUpsert = true };
                    _zealiUsers.UpdateOne(filterDefinition, updateDefinition, options);
                    zealiLoginAuth.email = zealiUsers_temp.email;
                    zealiLoginAuth.username = zealiUsers_temp.username;
                    zealiLoginAuth.isLoggedIn = true;
                    return zealiLoginAuth;
                }
                else
                {
                    zealiLoginAuth.email = zealiUsers.email;
                    zealiLoginAuth.isLoggedIn = false;
                    zealiLoginAuth.emailError = true;
                    zealiLoginAuth.emailMessage = "User does not Exist. Please click \"New to Zeali?\" to register";
                    return zealiLoginAuth;
                }
            }
            catch
            {
                zealiLoginAuth.isLoggedIn = false;
                zealiLoginAuth.emailError = true;
                zealiLoginAuth.emailMessage = "Something went wrong. Please try again";
                return zealiLoginAuth;
            }

        }

        public bool SaveTestDetails(string email, int score)
        {
            try
            {
                UpdateZealiUsers(email, Builders<ZealiUsers>.Update.Set(z => z.latestScore, score));
                UpdateZealiUsers(email, Builders<ZealiUsers>.Update.Set(z => z.highScore, ValidateAndGetHightScore(score, FindUser(email).highScore)));
                UpdateZealiUsers(email, Builders<ZealiUsers>.Update.Set(z => z.star, EvaluateStars(score)));
                LogTest(email, score);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public DashboardDTO GetDashboardData(string email)
        {
            DashboardDTO dashboard = new DashboardDTO();
            ZealiUsers zealiUsers = FindUser(email);
            dashboard.email = zealiUsers.email;
            dashboard.username = zealiUsers.username;
            dashboard.highScore = zealiUsers.highScore;
            dashboard.latestScore = zealiUsers.latestScore;
            dashboard.performance = zealiUsers.performance;
            dashboard.star = zealiUsers.star;

            return dashboard;
        }
        public ZealiUsers FindUser(string email)
        {
            return _zealiUsers.Find(user => user.email.ToLower() == email.ToLower()).FirstOrDefault();
        }

        public void LogTest(string email, int score)
        {
            Performance performance = new Performance();
            performance.Test = GenerateTestName(email);
            performance.Score = score;
            var filterDefinition = Builders<ZealiUsers>.Filter.And(
            Builders<ZealiUsers>.Filter.Where(user => user.email.ToLower() == email.ToLower()));
            var updateDefinition = Builders<ZealiUsers>.Update.Push("performance", performance);
            var options = new UpdateOptions { IsUpsert = true };
            _zealiUsers.UpdateOne(filterDefinition, updateDefinition, options);
        }

        public string GenerateTestName(string email)
        {
            int testCount = _zealiUsers.Find(user => user.email.ToLower() == email.ToLower()).FirstOrDefault().performance.Count;
            return "T" + (testCount + 1);
        }

        public int ValidateAndGetHightScore(int score, int highscore)
        {
            if (score < highscore)
                return highscore;
            if (score >= highscore)
                return score;
            else
                return highscore;
        }

        public double EvaluateStars(int score)
        {
            double star = score / 4;
            return Math.Round(star);
        }

        public void UpdateZealiUsers(string email, UpdateDefinition<ZealiUsers> updateDefinition)
        {
            var filterDefinition = Builders<ZealiUsers>.Filter.And(
            Builders<ZealiUsers>.Filter.Where(user => user.email.ToLower() == email.ToLower()));
            var options = new UpdateOptions { IsUpsert = true };
            _zealiUsers.UpdateOne(filterDefinition, updateDefinition, options);

        }
    }
}

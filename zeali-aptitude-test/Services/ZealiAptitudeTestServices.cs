using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using zeali_aptitude_test.Data;
using zeali_aptitude_test.Helpers;
using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Services
{
    public class ZealiAptitudeTestServices : IZealiAptitudeTestServices
    {
        private readonly IMongoCollection<AptitudeQuestions> _aptitudeQuestions;
        private readonly IMongoCollection<ZealiUsers> _zealiUsers;
        private readonly IMongoCollection<NewUsers> _newUsers;
        private readonly IEmailAndSecurityManagment _emailAndSecurityManagment;
        private readonly IJwtService _jwtService;

        public ZealiAptitudeTestServices(IDBClient dBClient, IEmailAndSecurityManagment emailAndSecurityManagment, IJwtService jwtService)
        {
            _aptitudeQuestions = dBClient.GetAptitudeQuestionsCollection();
            _zealiUsers = dBClient.GetZealiUsers();
            _newUsers = dBClient.GetNewUsers();
            _emailAndSecurityManagment = emailAndSecurityManagment;
            _jwtService = jwtService;
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

        public int InsertNewZealiUser(ZealiUsers zealiUsers)
        {
            try
            {
                zealiUsers.password = _emailAndSecurityManagment.encryptPassword(zealiUsers.password);
                _zealiUsers.InsertOne(zealiUsers);
                return 0;
            }
            catch
            {
                return 9005;
            }
        }

        public int AuthenticateZealiUsers(ZealiUsers zealiUsers)
        {
            try
            {
                ZealiUsers user = FindUser(zealiUsers.email);
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



        public int GenerateOTP(ZealiUsers zealiUsers, string mode)
        {
            try
            {
                string otp = _emailAndSecurityManagment.createOTP();
                var result = _emailAndSecurityManagment.sendEmail(zealiUsers.email, zealiUsers.username, mode, otp);
                if (result)
                {
                    if (mode == "Login")
                        UpdateZealiUsers(zealiUsers.email, Builders<ZealiUsers>.Update.Set(z => z.otp, otp));
                    if (mode == "SignUp")
                    {
                        if (isNewUserExist(zealiUsers.email))
                        {
                            UpdateNewUsers(zealiUsers.email, Builders<NewUsers>.Update.Set(z => z.otp, otp));
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

        public int VerifyOTP(ZealiUsers zealiUsers)
        {
            try
            {
                ZealiUsers user = FindUser(zealiUsers.email);
                if (user.otp == zealiUsers.otp)
                    return 0;
                else
                    return 9004;
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
                NewUsers user = FindNewUser(zealiUsers.email);
                if (user.otp == zealiUsers.otp)
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
                UpdateZealiUsers(zealiUsers.email, Builders<ZealiUsers>.Update.Set(z => z.password, _emailAndSecurityManagment.encryptPassword(zealiUsers.password)));
                return 0;
            }
            catch
            {
                return 9005;
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

        public NewUsers FindNewUser(string email)
        {
            return _newUsers.Find(user => user.email.ToLower() == email.ToLower()).FirstOrDefault();
        }

        public bool isNewUserExist(string email)
        {
            try
            {
                NewUsers newUser = FindNewUser(email);
                if (newUser != null)
                    return true;
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }

        public bool isUserExist(string email)
        {
            try
            {
                ZealiUsers zealiUsers = FindUser(email);
                if (zealiUsers != null)
                    return true;
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }

        public void RemoveNewUser(string email)
        {
            _newUsers.DeleteOne(user => user.email.ToLower() == email.ToLower());
        }

        public string GenerateJWT(string email)
        {
            return _jwtService.Generate(email);
        }

        public string GetIssuer(string jwt)
        {
            return _jwtService.Verify(jwt).Issuer;
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

        public void UpdateNewUsers(string email, UpdateDefinition<NewUsers> updateDefinition)
        {
            var filterDefinition = Builders<NewUsers>.Filter.And(
            Builders<NewUsers>.Filter.Where(user => user.email.ToLower() == email.ToLower()));
            var options = new UpdateOptions { IsUpsert = true };
            _newUsers.UpdateOne(filterDefinition, updateDefinition, options);
        }


    }
}

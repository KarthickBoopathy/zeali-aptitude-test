using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using zeali_aptitude_test.Data;
using zeali_aptitude_test.Helpers;
using zeali_aptitude_test.Models;
using zeali_aptitude_test.Services.Interfaces;

namespace zeali_aptitude_test.Services
{
    public class ZealiAptitudeTestServices : IZealiAptitudeTestServices
    {
        private readonly IMongoCollection<AptitudeQuestions> _aptitudeQuestions;
        private readonly IMongoCollection<ZealiUsers> _zealiUsers;
        private readonly IHelper _helper;

        public ZealiAptitudeTestServices(IDBClient dBClient, IHelper helper)
        {
            _aptitudeQuestions = dBClient.GetAptitudeQuestionsCollection();
            _zealiUsers = dBClient.GetZealiUsers();
            _helper = helper;
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


        public int SaveTestDetails(string email, int score)
        {
            try
            {
                _helper.UpdateZealiUsers(email, Builders<ZealiUsers>.Update.Set(z => z.latestScore, score));
                _helper.UpdateZealiUsers(email, Builders<ZealiUsers>.Update.Set(z => z.highScore, ValidateAndGetHightScore(score, _helper.FindUser(email).highScore)));
                _helper.UpdateZealiUsers(email, Builders<ZealiUsers>.Update.Set(z => z.star, EvaluateStars(score)));
                LogTest(email, score);
                return 0;
            }
            catch
            {
                return 9005;
            }
        }

        public void LogTest(string email, int score)
        {
            Performance performance = new Performance();
            performance.Test = GenerateTestName(email);
            performance.Score = score;
            var filterDefinition = Builders<ZealiUsers>.Filter.And(
            Builders<ZealiUsers>.Filter.Where(user => user.email.ToLower() == email.ToLower()));
            var updateDefinition = Builders<ZealiUsers>.Update.Push(z => z.performance, performance);
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



    }
}

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

        public ZealiAptitudeTestServices(IDBClient dBClient)
        {
            _aptitudeQuestions = dBClient.GetAptitudeQuestionsCollection();
        }

        public List<AptitudeQuestions> GetAptitudeQuestions()
        {
            List< AptitudeQuestions > allAptitudeQuestions = _aptitudeQuestions.Find(questions => true).ToList().OrderBy(i => Guid.NewGuid()).ToList();
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

    }
}

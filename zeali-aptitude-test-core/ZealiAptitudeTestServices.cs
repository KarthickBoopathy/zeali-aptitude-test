using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace zeali_aptitude_test_core
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
            return _aptitudeQuestions.Find(questions => true).ToList();
        }
    }
}

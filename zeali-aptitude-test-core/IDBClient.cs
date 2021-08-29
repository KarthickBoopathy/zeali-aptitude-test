using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace zeali_aptitude_test_core
{
    public interface IDBClient
    {
        IMongoCollection<AptitudeQuestions> GetAptitudeQuestionsCollection();
    }
}

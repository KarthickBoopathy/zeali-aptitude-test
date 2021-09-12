using MongoDB.Driver;
using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Services
{
    public interface IDBClient
    {
        IMongoCollection<AptitudeQuestions> GetAptitudeQuestionsCollection();
        IMongoCollection<ZealiUsers> GetZealiUsers();
    }
}

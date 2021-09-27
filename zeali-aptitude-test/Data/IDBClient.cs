using MongoDB.Driver;
using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Data
{
    public interface IDBClient
    {
        IMongoCollection<AptitudeQuestions> GetAptitudeQuestionsCollection();
        IMongoCollection<ZealiUsers> GetZealiUsers();
        IMongoCollection<NewUsers> GetNewUsers();
    }
}

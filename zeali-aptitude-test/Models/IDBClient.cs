using MongoDB.Driver;

namespace zeali_aptitude_test.Models
{
    public interface IDBClient
    {
        IMongoCollection<AptitudeQuestions> GetAptitudeQuestionsCollection();
        IMongoCollection<ZealiUsers> GetZealiUsers();
    }
}

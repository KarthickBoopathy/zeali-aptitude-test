using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace zeali_aptitude_test_core
{
    public class DBClient : IDBClient
    {
        private readonly IMongoCollection<AptitudeQuestions> _aptitudeQuestions;

        public DBClient(IOptions<ZealiAptitudeTestDBConfig> zealiAptitudeTestDBConfig)
        {
            var client = new MongoClient(zealiAptitudeTestDBConfig.Value.Connection_String);
            var database = client.GetDatabase(zealiAptitudeTestDBConfig.Value.Database_Name);
            _aptitudeQuestions = database.GetCollection<AptitudeQuestions>(zealiAptitudeTestDBConfig.Value.Aptitude_Questions_Collection_Name);
        }

        public IMongoCollection<AptitudeQuestions> GetAptitudeQuestionsCollection()
        {
            return _aptitudeQuestions;
        }


        //dotnet user-secrets init -p zeali-aptitude-test
        //dotnet user-secrets set "CONNECTION_STRING" "That Connection String" -p zeali-aptitude-test
        //dotnet user-secrets lists -p zeali-aptitude-test
        //dotnet user-secrets list -p zeali-aptitude-test
        //"CONNECTION_STRING": "mongodb://localhost:27017"
    }
}

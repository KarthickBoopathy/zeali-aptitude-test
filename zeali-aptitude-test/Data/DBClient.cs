﻿using MongoDB.Driver;
using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Data
{
    public class DBClient : IDBClient
    {
        private readonly IMongoCollection<AptitudeQuestions> _aptitudeQuestions;
        private readonly IMongoCollection<ZealiUsers> _zealiUsers;
        private readonly IMongoCollection<NewUsers> _newUsers;

        public DBClient(ZealiAptitudeTestDBConfig zealiAptitudeTestDBConfig)
        {
            var client = new MongoClient(zealiAptitudeTestDBConfig.Connection_String);
            var database = client.GetDatabase(zealiAptitudeTestDBConfig.Database_Name);

            _aptitudeQuestions = database.GetCollection<AptitudeQuestions>(zealiAptitudeTestDBConfig.Aptitude_Questions_Collection_Name);
            _zealiUsers = database.GetCollection<ZealiUsers>(zealiAptitudeTestDBConfig.Zeali_Users_Collection_Name);
            _newUsers = database.GetCollection<NewUsers>(zealiAptitudeTestDBConfig.New_Users_Collection_Name);
        }

        public IMongoCollection<AptitudeQuestions> GetAptitudeQuestionsCollection()
        {
            return _aptitudeQuestions;
        }

        public IMongoCollection<ZealiUsers> GetZealiUsers()
        {
            return _zealiUsers;
        }

        public IMongoCollection<NewUsers> GetNewUsers()
        {
            return _newUsers;
        }


        //dotnet user-secrets init -p zeali-aptitude-test
        //dotnet user-secrets set "CONNECTION_STRING" "mongodb+srv://karthickboopathy:2.12.1997@zeali.ttf9l.mongodb.net/test" -p zeali-aptitude-test
        //dotnet user-secrets list -p zeali-aptitude-test
        //"CONNECTION_STRING": "mongodb://localhost:27017" 
    }
}

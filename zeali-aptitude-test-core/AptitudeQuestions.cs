using MongoDB.Bson.Serialization.Attributes;
using System;

namespace zeali_aptitude_test_core
{
    public class AptitudeQuestions
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string id { get; set; }
        public string questionID { get; set; }
        public string question { get; set; }
        public string optionA { get; set; }
        public string optionB { get; set; }
        public string optionC { get; set; }
        public string optionD { get; set; }
        public string answer { get; set; }
        public string userAnswer { get; set; }

    }
}

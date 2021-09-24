using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace zeali_aptitude_test.Models
{
    public class AptitudeQuestions
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _id { get; set; }
        public string questionID { get; set; }
        public string topic { get; set; }
        public string question { get; set; }
        public string optionA { get; set; }
        public string optionB { get; set; }
        public string optionC { get; set; }
        public string optionD { get; set; }
        public string answer { get; set; }
        public string userAnswer { get; set; }

    }
}

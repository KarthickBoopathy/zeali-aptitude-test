using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace zeali_aptitude_test.Models
{
    public class NewUsers
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _id { get; set; }
        public string email { get; set; }
        public string username { get; set; }
        public string otp { get; set; }
    }
}

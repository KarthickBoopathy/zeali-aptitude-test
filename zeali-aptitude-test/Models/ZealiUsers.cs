using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace zeali_aptitude_test.Models
{
    public class ZealiUsers
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string otp { get; set; }
        public string signUpDate { get; set; }
        public bool isTrialOver { get; set; }
        public bool isSubscribed { get; set; }
        public List<Performance> performance { get; set; } = new List<Performance>();
        public int highScore { get; set; }
        public int latestScore { get; set; }
        public double star { get; set; }
    }
}

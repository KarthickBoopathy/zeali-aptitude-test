using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace zeali_aptitude_test.Models
{
    public class ZealiUsers
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string id { get; set; }
        public string username { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public string signUpDate { get; set; }
        public bool isTrialOver { get; set; }
        public bool isSubscribed { get; set; }
        public List<Performance> userPerformance { get; set; }
        public int highScore { get; set; }
        public int latestScore { get; set; }
        public int star { get; set; }
    }
}

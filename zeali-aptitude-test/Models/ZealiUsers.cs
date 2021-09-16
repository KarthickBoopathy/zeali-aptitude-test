using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;


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
      

       
    }
}

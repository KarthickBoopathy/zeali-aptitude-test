using MongoDB.Driver;
using System.Linq;
using zeali_aptitude_test.Data;
using zeali_aptitude_test.Helpers;
using zeali_aptitude_test.Models;
using zeali_aptitude_test.Services.Interfaces;

namespace zeali_aptitude_test.Services
{
    public class Helper: IHelper
    {
        private readonly IMongoCollection<ZealiUsers> _zealiUsers;
        private readonly IMongoCollection<NewUsers> _newUsers;
        private readonly IJwtService _jwtService;

        public Helper(IDBClient dBClient, IJwtService jwtService)
        {
            _zealiUsers = dBClient.GetZealiUsers();
            _newUsers = dBClient.GetNewUsers();
            _jwtService = jwtService;
        }

        public ZealiUsers FindUser(string email)
        {
            return _zealiUsers.Find(user => user.email.ToLower() == email.ToLower()).FirstOrDefault();
        }

        public NewUsers FindNewUser(string email)
        {
            return _newUsers.Find(user => user.email.ToLower() == email.ToLower()).FirstOrDefault();
        }

        public bool isNewUserExist(string email)
        {
            try
            {
                NewUsers newUser = FindNewUser(email);
                if (newUser != null)
                    return true;
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }

        public bool isUserExist(string email)
        {
            try
            {
                ZealiUsers zealiUsers = FindUser(email);
                if (zealiUsers != null)
                    return true;
                else
                    return false;
            }
            catch
            {
                return false;
            }
        }


        public string GenerateJWT(string email)
        {
            return _jwtService.Generate(email);
        }

        public string GetIssuer(string jwt)
        {
            return _jwtService.Verify(jwt).Issuer;
        }

        public void UpdateZealiUsers(string email, UpdateDefinition<ZealiUsers> updateDefinition)
        {
            var filterDefinition = Builders<ZealiUsers>.Filter.And(
            Builders<ZealiUsers>.Filter.Where(user => user.email.ToLower() == email.ToLower()));
            var options = new UpdateOptions { IsUpsert = true };
            _zealiUsers.UpdateOne(filterDefinition, updateDefinition, options);

        }

        public void UpdateNewUsers(string email, UpdateDefinition<NewUsers> updateDefinition)
        {
            var filterDefinition = Builders<NewUsers>.Filter.And(
            Builders<NewUsers>.Filter.Where(user => user.email.ToLower() == email.ToLower()));
            var options = new UpdateOptions { IsUpsert = true };
            _newUsers.UpdateOne(filterDefinition, updateDefinition, options);
        }

    }
}

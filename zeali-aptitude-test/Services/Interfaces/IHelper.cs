using MongoDB.Driver;
using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Services.Interfaces
{
    public interface IHelper
    {
        ZealiUsers FindUser(string email);
        NewUsers FindNewUser(string email);
        bool isNewUserExist(string email);
        bool isUserExist(string email);
        string GenerateJWT(string email);
        string GetIssuer(string jwt);
        void UpdateZealiUsers(string email, UpdateDefinition<ZealiUsers> updateDefinition);
        void UpdateNewUsers(string email, UpdateDefinition<NewUsers> updateDefinition);
    }
}

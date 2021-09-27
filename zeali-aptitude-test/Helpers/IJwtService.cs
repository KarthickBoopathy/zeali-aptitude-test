using System.IdentityModel.Tokens.Jwt;

namespace zeali_aptitude_test.Helpers
{
    public interface IJwtService
    {
        string Generate(string email);
        JwtSecurityToken Verify(string jwt);
    }
}

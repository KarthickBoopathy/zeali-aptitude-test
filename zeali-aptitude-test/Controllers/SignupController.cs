using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using zeali_aptitude_test.Helpers;
using zeali_aptitude_test.Models;
using zeali_aptitude_test.Services.Interfaces;

namespace zeali_aptitude_test.Controllers
{
    [ApiController]
    [Route("api/zealiAptitudeTest/[controller]")]
    public class SignupController : Controller
    {
        private readonly ISignupService _signupService;
        private readonly IHelper _helper;
        private readonly IErrorCode _errorCode;


        public static string ZAPT01 = "Login";
        public static string ZAPT02 = "SignUp";
        public SignupController(IErrorCode errorCode, IHelper helper, ISignupService signupService)
        {
            _errorCode = errorCode;
            _helper = helper;
            _signupService = signupService;
        }

        [HttpPost]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult registerNewZealiUsers(ZealiUsers zealiUsers)
        {
            int code = _signupService.InsertNewZealiUser(zealiUsers);
            if (code == 0)
            {
                _signupService.RemoveNewUser(zealiUsers.email);
                LogUserCookies(zealiUsers.email);
            }
            return Ok(_errorCode.Error(code));
        }

        [HttpPost("{mode}/OTP")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult generateUserOTP(string mode, ZealiUsers zealiUsers)
        {

            if (mode == ZAPT02)
            {
                if (!_helper.isUserExist(zealiUsers.email))
                    return Ok(_errorCode.Error(_signupService.GenerateOTP(zealiUsers, ZAPT02)));
                else
                    return Ok(_errorCode.Error(9003));

            }
            else if (mode == ZAPT01)
            {
                if (!_helper.isUserExist(zealiUsers.email))
                    return Ok(_errorCode.Error(9001));
                else
                {
                    zealiUsers.username = zealiUsers.username;
                    return Ok(_errorCode.Error(_signupService.GenerateOTP(zealiUsers, ZAPT01)));
                }

            }
            else
                return Ok(_errorCode.Error(9005));
        }


        [HttpPost("VerifyNewOTP")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult verifyNewUserOTP(ZealiUsers zealiUsers)
        {
            if (_helper.isNewUserExist(zealiUsers.email))
                return Ok(_errorCode.Error(_signupService.VerifyNewUserOTP(zealiUsers)));
            else
                return Ok(_errorCode.Error(9001));
        }

        private void LogUserCookies(string email)
        {
            var jwt = _helper.GenerateJWT(email);
            Response.Cookies.Append("zeali", jwt);
        }
    }
}

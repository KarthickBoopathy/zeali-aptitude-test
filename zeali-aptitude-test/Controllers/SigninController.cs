using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using zeali_aptitude_test.Helpers;
using zeali_aptitude_test.Models;
using zeali_aptitude_test.Services.Interfaces;

namespace zeali_aptitude_test.Controllers
{
    [ApiController]
    [Route("api/zealiAptitudeTest/[controller]")]
    public class SigninController : Controller
    {


        private readonly ISigninService _signinService;
        private readonly IHelper _helper;
        private readonly IErrorCode _errorCode;

        public SigninController(IErrorCode errorCode, IHelper helper, ISigninService signinService)
        {
            _errorCode = errorCode;
            _helper = helper;
            _signinService = signinService;
        }


        [HttpPost]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult loginZeali(ZealiUsers zealiUsers)
        {
            if (_helper.isUserExist(zealiUsers.email))
            {
                int code = _signinService.AuthenticateZealiUsers(zealiUsers);
                if (code == 0)
                    LogUserCookies(zealiUsers.email);

                return Ok(_errorCode.Error(code));
            }
            else
                return Ok(_errorCode.Error(9001));
        }

        [HttpPost("VerifyOTP")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult verifyExistingUserOTP(ZealiUsers zealiUsers)
        {
            if (_helper.isUserExist(zealiUsers.email))
                return Ok(_errorCode.Error(_signinService.VerifyOTP(zealiUsers)));
            else
                return Ok(_errorCode.Error(9001));
        }

        [HttpPost("ChangePassword")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult userChangePassword(ZealiUsers zealiUsers)
        {
            int code = _signinService.ChangePassword(zealiUsers);
            if (code == 0)
                LogUserCookies(zealiUsers.email);

            return Ok(_errorCode.Error(code));
        }

        [HttpGet("Logout")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult logout()
        {
            RemoveCookies();
            return Ok(_errorCode.Error(0));
        }


        private void LogUserCookies(string email)
        {
            var jwt = _helper.GenerateJWT(email);
            Response.Cookies.Append("zeali", jwt);
        }

        private void RemoveCookies()
        {
            Response.Cookies.Delete("zeali");
        }
    }
}

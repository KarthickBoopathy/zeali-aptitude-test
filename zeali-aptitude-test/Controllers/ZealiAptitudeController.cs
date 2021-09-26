using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using zeali_aptitude_test.Helpers;
using zeali_aptitude_test.Models;
using zeali_aptitude_test.Services;

namespace zeali_aptitude_test.Controllers
{
    [ApiController]
    [Route("api/zealiAptitudeTest/[controller]")]
    public class ZealiAptitudeController : ControllerBase
    {
        private readonly IZealiAptitudeTestServices _zealiAptitudeTestServices;
        private readonly IErrorCode _errorCode;

        public static string ZAPT01 = "Login";
        public static string ZAPT02 = "SignUp";


        public ZealiAptitudeController(IZealiAptitudeTestServices zealiAptitudeTestServices, IErrorCode errorCode)
        {
            _zealiAptitudeTestServices = zealiAptitudeTestServices;
            _errorCode = errorCode;
        }


        [HttpGet]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult getAptitudeQuestions()
        {
            if (validateUser().isValid)
                return Ok(_zealiAptitudeTestServices.GetAptitudeQuestions());
            else
                return Unauthorized(_errorCode.Error(9005));
        }

        [HttpPost]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult registerNewZealiUsers(ZealiUsers zealiUsers)
        {
            int code = _zealiAptitudeTestServices.InsertNewZealiUser(zealiUsers);
            if (code == 0)
            {
                _zealiAptitudeTestServices.RemoveNewUser(zealiUsers.email);
                LogUserCookies(zealiUsers.email);
            }
            return Ok(_errorCode.Error(code));
        }

        [HttpPost("Login")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult loginZeali(ZealiUsers zealiUsers)
        {
            if (_zealiAptitudeTestServices.isUserExist(zealiUsers.email))
            {
                LogUserCookies(zealiUsers.email);
                return Ok(_errorCode.Error(_zealiAptitudeTestServices.AuthenticateZealiUsers(zealiUsers)));
            }
            else
                return Ok(_errorCode.Error(9001));
        }

        [HttpPost("{mode}/OTP")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult generateUserOTP(string mode, ZealiUsers zealiUsers)
        {

            if (mode == ZAPT02)
            {
                if (!_zealiAptitudeTestServices.isUserExist(zealiUsers.email))
                    return Ok(_errorCode.Error(_zealiAptitudeTestServices.GenerateOTP(zealiUsers, ZAPT02)));
                else
                    return Ok(_errorCode.Error(9003));

            }
            else if (mode == ZAPT01)
            {
                if (!_zealiAptitudeTestServices.isUserExist(zealiUsers.email))
                    return Ok(_errorCode.Error(9001));
                else
                {
                    zealiUsers.username = zealiUsers.username;
                    return Ok(_errorCode.Error(_zealiAptitudeTestServices.GenerateOTP(zealiUsers, ZAPT01)));
                }

            }
            else
                return Ok(_errorCode.Error(9005));
        }

        [HttpPost("ChangePassword")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult userChangePassword(ZealiUsers zealiUsers)
        {
            return Ok(_errorCode.Error(_zealiAptitudeTestServices.ChangePassword(zealiUsers)));
        }

        [HttpPost("SaveTest")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult saveTestResults([FromBody] int score)
        {
            if (validateUser().isValid)
                return Ok(_zealiAptitudeTestServices.SaveTestDetails(validateUser().email, score));
            else
                return Ok();
        }

        [HttpGet("ZealiUserInfo")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult getZealiUserInfo()
        {
            if (validateUser().isValid)
                return Ok(_zealiAptitudeTestServices.GetDashboardData(validateUser().email));
            else
                return Ok();
        }

        [HttpPost("VerifyOTP")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult verifyExistingUserOTP(ZealiUsers zealiUsers)
        {
            if (_zealiAptitudeTestServices.isUserExist(zealiUsers.email))
                return Ok(_errorCode.Error(_zealiAptitudeTestServices.VerifyOTP(zealiUsers)));
            else
                return Ok(_errorCode.Error(9001));
        }

        [HttpPost("VerifyNewOTP")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult verifyNewUserOTP(ZealiUsers zealiUsers)
        {
            if (_zealiAptitudeTestServices.isNewUserExist(zealiUsers.email))
                return Ok(_errorCode.Error(_zealiAptitudeTestServices.VerifyNewUserOTP(zealiUsers)));
            else
                return Ok(_errorCode.Error(9001));
        }

        private void LogUserCookies(string email)
        {
            var jwt = _zealiAptitudeTestServices.GenerateJWT(email);
            Response.Cookies.Append("zeali", jwt);
        }

        private UserValidationDTO validateUser()
        {
            UserValidationDTO userValidation = new UserValidationDTO();
            try
            {

                var jwt = Request.Cookies["zeali"];
                var email = _zealiAptitudeTestServices.GetIssuer(jwt);
                userValidation.email = email;
                userValidation.isValid = _zealiAptitudeTestServices.isUserExist(email);
                return userValidation;
            }
            catch
            {
                userValidation.email = string.Empty;
                userValidation.isValid = false;
                return userValidation;
            }
        }


    }
}

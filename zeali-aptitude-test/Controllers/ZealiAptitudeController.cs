using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using zeali_aptitude_test.Models;
using zeali_aptitude_test.Services;

namespace zeali_aptitude_test.Controllers
{
    [ApiController]
    [Route("api/zealiAptitudeTest/[controller]")]
    public class ZealiAptitudeController : ControllerBase
    {
        private readonly IZealiAptitudeTestServices _zealiAptitudeTestServices;
        public static string ZAPT01 = "Login";
        public static string ZAPT02 = "SignUp";
        public ZealiAptitudeController(IZealiAptitudeTestServices zealiAptitudeTestServices)
        {
            _zealiAptitudeTestServices = zealiAptitudeTestServices;
        }


        [HttpGet]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult getAptitudeQuestions()
        {
            return Ok(_zealiAptitudeTestServices.GetAptitudeQuestions());
        }

        [HttpPost]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult registerNewZealiUsers(ZealiUsers zealiUsers)
        {
            return Ok(_zealiAptitudeTestServices.InsertNewZealiUser(zealiUsers));
        }

        [HttpPost("Login")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult loginZeali(ZealiUsers zealiUsers)
        {
            return Ok(_zealiAptitudeTestServices.AuthenticateZealiUsers(zealiUsers));
        }

        [HttpPost("{mode}/OTP")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult generateSignUpOTP(string mode, ZealiUsers zealiUsers)
        {
            ZealiUsers zealiUsers_temp = _zealiAptitudeTestServices.FindUser(zealiUsers.email);

            if (mode == ZAPT02)
            {
                if (zealiUsers_temp == null)
                {
                    return Ok(_zealiAptitudeTestServices.GenerateOTP(zealiUsers, ZAPT02));
                }
                else
                {
                    ZealiLoginAuthDTO zealiLoginAuth = new ZealiLoginAuthDTO();
                    zealiLoginAuth.emailError = true;
                    zealiLoginAuth.emailMessage = "Already an existing user. Please use different email address";
                    return Ok(zealiLoginAuth);
                }

            }
            else if (mode == ZAPT01)
            {
                if (zealiUsers_temp == null)
                {
                    ZealiLoginAuthDTO zealiLoginAuth = new ZealiLoginAuthDTO();
                    zealiLoginAuth.emailError = true;
                    zealiLoginAuth.emailMessage = "User does not Exist. Please click \"New to Zeali?\" to register";
                    return Ok(zealiLoginAuth);
                }
                else
                {
                    zealiUsers.username = zealiUsers_temp.username;
                    return Ok(_zealiAptitudeTestServices.GenerateOTP(zealiUsers, ZAPT01));
                }

            }
            else
            {
                return Ok();
            }
        }

        [HttpPost("ChangePassword")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult userChangePassword(ZealiUsers zealiUsers)
        {
            return Ok(_zealiAptitudeTestServices.ChangePassword(zealiUsers));

        }

        [HttpPost("SaveTest")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult saveTestResults(SaveTestDTO saveTestDTO)
        {
            return Ok(_zealiAptitudeTestServices.SaveTestDetails(saveTestDTO.email, saveTestDTO.latestScore));
        }

        [HttpPost("ZealiUserInfo")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult getZealiUserInfo([FromBody] string email)
        {
            return Ok(_zealiAptitudeTestServices.GetDashboardData(email));
        }

    }
}

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
        public static string ZAPT01 = "FORGOT PASSWORD";
        public static string ZAPT02 = "SIGNUP";
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

            return Ok(_zealiAptitudeTestServices.authenticateZealiUsers(zealiUsers));
        }

        [HttpPost("ForgotPassword/OTP")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult generateForgotPasswordOTP(ZealiUsers zealiUsers)
        {
            if (_zealiAptitudeTestServices.findUsers(zealiUsers) != null)
            {
                return Ok(_zealiAptitudeTestServices.generateOTP(zealiUsers, ZAPT01));
            }
            else
            {
                ZealiLoginAuth zealiLoginAuth = new ZealiLoginAuth();
                zealiLoginAuth.emailError = true;
                zealiLoginAuth.emailMessage = "User does not Exist. Please register";
                return Ok(zealiLoginAuth);
            }
        }

        [HttpPost("SignUp/OTP")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult generateSignUpOTP(ZealiUsers zealiUsers)
        {
           
            if (_zealiAptitudeTestServices.findUsers(zealiUsers) == null)
            {
                return Ok(_zealiAptitudeTestServices.generateOTP(zealiUsers, ZAPT02));
            }
            else
            {
                ZealiLoginAuth zealiLoginAuth = new ZealiLoginAuth();
                zealiLoginAuth.emailError = true;
                zealiLoginAuth.emailMessage = "User does already Exist. Please try again";
                return Ok(zealiLoginAuth);
            }

           

        }

    }
}

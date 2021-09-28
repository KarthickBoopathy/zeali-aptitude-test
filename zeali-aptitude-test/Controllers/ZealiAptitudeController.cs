using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using zeali_aptitude_test.Helpers;
using zeali_aptitude_test.Models;
using zeali_aptitude_test.Services.Interfaces;

namespace zeali_aptitude_test.Controllers
{
    [ApiController]
    [Route("api/zealiAptitudeTest/[controller]")]
    public class ZealiAptitudeController : ControllerBase
    {
        private readonly IZealiAptitudeTestServices _zealiAptitudeTestServices;
        private readonly IHelper _helper;
        private readonly IErrorCode _errorCode;

        public ZealiAptitudeController(IZealiAptitudeTestServices zealiAptitudeTestServices, IErrorCode errorCode, IHelper helper)
        {
            _zealiAptitudeTestServices = zealiAptitudeTestServices;
            _errorCode = errorCode;
            _helper = helper;
        }

        [HttpGet("Authorize")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult authorize()
        {
            if (validateUser().isValid)
                return Ok(_errorCode.Error(0));
            else
                return Ok(_errorCode.Error(9005));
        }

        [HttpGet]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult getAptitudeQuestions()
        {
            if (validateUser().isValid)
                return Ok(_zealiAptitudeTestServices.GetAptitudeQuestions());
            else
                return Ok(_errorCode.Error(9005));
        }

        [HttpPost("SaveTest")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult saveTestResults([FromBody] int score)
        {
            if (validateUser().isValid)
                return Ok(_errorCode.Error(_zealiAptitudeTestServices.SaveTestDetails(validateUser().email, score)));
            else
                return Ok(_errorCode.Error(9005));
        }   


        private UserValidationDTO validateUser()
        {
            UserValidationDTO userValidation = new UserValidationDTO();
            try
            {

                var jwt = Request.Cookies["zeali"];
                var email = _helper.GetIssuer(jwt);
                userValidation.email = email;
                userValidation.isValid = _helper.isUserExist(email);
                if (!userValidation.isValid)
                    RemoveCookies();
                return userValidation;
            }
            catch
            {
                userValidation.email = string.Empty;
                userValidation.isValid = false;
                RemoveCookies();
                return userValidation;
            }
        }

        private void RemoveCookies()
        {
            Response.Cookies.Delete("zeali");
        }


    }
}

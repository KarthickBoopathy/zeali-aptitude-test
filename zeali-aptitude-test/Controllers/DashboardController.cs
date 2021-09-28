using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using zeali_aptitude_test.Helpers;
using zeali_aptitude_test.Models;
using zeali_aptitude_test.Services.Interfaces;

namespace zeali_aptitude_test.Controllers
{
    [ApiController]
    [Route("api/zealiAptitudeTest/[controller]")]
    public class DashboardController : Controller
    {
        private readonly IDashboardService _dashboardService;
        private readonly IHelper _helper;
        private readonly IErrorCode _errorCode;

        public DashboardController(IErrorCode errorCode, IHelper helper, IDashboardService dashboardService)
        {
            _errorCode = errorCode;
            _helper = helper;
            _dashboardService = dashboardService;
        }


        [HttpGet("ZealiUserInfo")]
        [EnableCors("ZealiAptitudePolicy")]
        public IActionResult getZealiUserInfo()
        {
            if (validateUser().isValid)
                return Ok(_dashboardService.GetDashboardData(validateUser().email));
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

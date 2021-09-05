using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using zeali_aptitude_test.Services;

namespace zeali_aptitude_test.Controllers
{
    [ApiController]
    [Route("api/zealiAptitudeTest/[controller]")]

 

    public class ZealiAptitudeController : ControllerBase
    {
        private readonly IZealiAptitudeTestServices _zealiAptitudeTestServices;

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


    }
}

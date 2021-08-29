using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using zeali_aptitude_test_core;

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
        public IActionResult getAptitudeQuestions()
        {
            return Ok(_zealiAptitudeTestServices.GetAptitudeQuestions());
        }


    }
}

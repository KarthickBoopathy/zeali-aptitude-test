using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace zeali_aptitude_test.Models
{
    public class ZealiLoginAuth
    {
        public string email { get; set; }
        public bool isLoggedIn { get; set; }

        public string errorMessage { get; set; }
    }
}

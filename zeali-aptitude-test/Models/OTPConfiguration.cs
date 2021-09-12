using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace zeali_aptitude_test.Models
{
    public class OTPConfiguration
    {
        public string Host { get; set; }
        public int Port { get; set; }
        public string ApplicationName { get; set; }
        public string ApplicationEmail { get; set; }
        public string ApplicationPassword { get; set; }

    }
}

﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace zeali_aptitude_test.Models
{
    public class ZealiAptitudeTestDBConfig
    {
        public string Database_Name { get; set; }
        public string Aptitude_Questions_Collection_Name { get; set; }
        public string Zeali_Users_Collection_Name { get; set; }
        public string Connection_String { get; set; }
    }
}

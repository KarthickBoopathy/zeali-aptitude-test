using System.Collections.Generic;

namespace zeali_aptitude_test.Models
{
    public class Dashboard
    {
        public string username { get; set; }
        public string email { get; set; }
        public List<Performance> performance { get; set; } = new List<Performance>();
        public int highScore { get; set; }
        public int latestScore { get; set; }
        public double star { get; set; }
    }
}

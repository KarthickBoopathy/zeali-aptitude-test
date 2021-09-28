using zeali_aptitude_test.Models;
using zeali_aptitude_test.Services.Interfaces;

namespace zeali_aptitude_test.Services
{
    public class DashboardService: IDashboardService
    {

        private readonly IHelper _helper;

        public DashboardService(IHelper helper)
        {
            _helper = helper;
        }

        public DashboardDTO GetDashboardData(string email)
        {
            DashboardDTO dashboard = new DashboardDTO();
            ZealiUsers zealiUsers = _helper.FindUser(email);
            dashboard.email = zealiUsers.email;
            dashboard.username = zealiUsers.username;
            dashboard.highScore = zealiUsers.highScore;
            dashboard.latestScore = zealiUsers.latestScore;
            dashboard.performance = zealiUsers.performance;
            dashboard.star = zealiUsers.star;

            return dashboard;
        }

    }
}

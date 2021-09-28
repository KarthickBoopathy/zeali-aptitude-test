using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Services.Interfaces
{
    public interface IDashboardService
    {
        DashboardDTO GetDashboardData(string email);
    }
}

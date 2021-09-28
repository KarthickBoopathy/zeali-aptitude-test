using System.Collections.Generic;
using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Services.Interfaces
{
   public interface IZealiAptitudeTestServices
    {
        List<AptitudeQuestions> GetAptitudeQuestions();
        int SaveTestDetails(string email, int score); 
    }
}

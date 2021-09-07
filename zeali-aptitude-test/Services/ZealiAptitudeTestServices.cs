using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using zeali_aptitude_test.Models;

namespace zeali_aptitude_test.Services
{
    public class ZealiAptitudeTestServices : IZealiAptitudeTestServices
    {
        private readonly IMongoCollection<AptitudeQuestions> _aptitudeQuestions;

        private readonly IMongoCollection<ZealiUsers> _zealiUsers;

        public ZealiAptitudeTestServices(IDBClient dBClient)
        {
            _aptitudeQuestions = dBClient.GetAptitudeQuestionsCollection();
            _zealiUsers = dBClient.GetZealiUsers();
        }

        public List<AptitudeQuestions> GetAptitudeQuestions()
        {
            List<AptitudeQuestions> allAptitudeQuestions = _aptitudeQuestions.Find(questions => true).ToList().OrderBy(i => Guid.NewGuid()).ToList();
            List<AptitudeQuestions> currentTestQuestions = new List<AptitudeQuestions>();
            int count = 0;
            foreach (AptitudeQuestions app in allAptitudeQuestions)
            {
                count = count + 1;
                if (count <= 20)
                {
                    currentTestQuestions.Add(app);

                }
            }

            return currentTestQuestions;
        }

        public ZealiLoginAuth InsertNewZealiUser(ZealiUsers zealiUsers)
        {

            ZealiLoginAuth zealiLoginAuth = new ZealiLoginAuth();
            try
            {
                _zealiUsers.InsertOne(zealiUsers);
                zealiLoginAuth.email = zealiUsers.email;
                zealiLoginAuth.isLoggedIn = true;

                return zealiLoginAuth;
            }
            catch
            {
                return zealiLoginAuth;
            }


        }

        public ZealiLoginAuth authenticateZealiUsers(ZealiUsers zealiUsers)
        {
            ZealiLoginAuth zealiLoginAuth = new ZealiLoginAuth();

            try
            {
                ZealiUsers zealiUsers_temp = _zealiUsers.Find(user => user.email == zealiUsers.email).First();
              
                if (zealiUsers_temp == null)
                {
                    zealiLoginAuth.email = zealiUsers.email;
                    zealiLoginAuth.isLoggedIn = false;
                    zealiLoginAuth.errorMessage = "This user does not exist. Please register";
                }
                else
                {
                    if ((zealiUsers_temp.email == zealiUsers.email) && (zealiUsers_temp.password == zealiUsers.email))
                    {
                        zealiLoginAuth.email = zealiUsers.email;
                        zealiLoginAuth.isLoggedIn = true;
                    }
                    else
                    {
                        zealiLoginAuth.email = zealiUsers.email;
                        zealiLoginAuth.isLoggedIn = false;
                        zealiLoginAuth.errorMessage = "Incorrect Password";
                    }

                }


                return zealiLoginAuth;
            }
            catch
            {
                return zealiLoginAuth;
            }
        }



    }
}

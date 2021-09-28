using System;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using zeali_aptitude_test.Models;
using zeali_aptitude_test.Services.Interfaces;

namespace zeali_aptitude_test.Services
{
    public class EmailAndSecurityManagment : IEmailAndSecurityManagment
    {

        private readonly OTPConfiguration _otpConfiguration;

        public EmailAndSecurityManagment(OTPConfiguration otpConfiguration)
        {
            _otpConfiguration = otpConfiguration;
        }
        public string encryptPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }

        public string createOTP()
        {
            var library = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
            var otp = new char[6];
            var random = new Random();

            for (int i = 0; i < otp.Length; i++)
            {
                otp[i] = library[random.Next(library.Length)];
            }
             
            return new String(otp);
        }

        public bool sendEmail(string email, string userName, string mode, string otp)
        {
            try
            {
                if (userName == null)
                    userName = "Zeali";

                SmtpClient Client = new SmtpClient()
                {
                    Host = _otpConfiguration.Host,
                    Port = _otpConfiguration.Port,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential()
                    {
                        UserName = _otpConfiguration.ApplicationEmail,
                        Password = _otpConfiguration.ApplicationPassword
                    }
                };
                MailAddress FromEmail = new MailAddress(_otpConfiguration.ApplicationEmail, _otpConfiguration.ApplicationName);
                MailAddress ToEmail = new MailAddress(email, userName);
                MailMessage Message = new MailMessage()
                {
                    From = FromEmail,
                    Subject = createEmailSubject(mode),
                    Body = createEmailBody(userName, otp, mode),

                };
                Message.To.Add(ToEmail);

                Client.SendMailAsync(Message);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public string createEmailSubject(string mode)
        {
            return "Zeali Aptitude Test - " + mode + " OTP Confirmation";
        }
        public string createEmailBody(string userName, string otp, string mode)
        {
            return "Hello " + userName + ", your OTP is [" + otp + "]. Please enter this OTP in your " + mode + " page and please do not share this to anyone.";
        }
    }
}

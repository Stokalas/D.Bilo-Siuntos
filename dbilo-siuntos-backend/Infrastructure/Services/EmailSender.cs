using Infrastructure.Interfaces;
using Infrastructure.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Google.Apis.Auth.OAuth2;
using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;
using MailKit.Security;


namespace Infrastructure.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly ILogger<EmailSender> _logger;
        private readonly Secrets _secrets;
        public EmailSender(ILogger<EmailSender> logger, Secrets secrets)
        {
            _logger = logger;
            _secrets = secrets;
        }

        public async void SendReceiver(RecipientDetails data, Address address, string tracking)
        {
            try
            {
                string clientId = _secrets.Id;
                string clientSecret = _secrets.Secret;
                string fromMail = "sprendimai.programoms@gmail.com";
                string[] scopes = new string[] { "https://mail.google.com/" };
                ClientSecrets clientSecrets = new()
                {
                    ClientId = clientId,
                    ClientSecret = clientSecret
                };
                //Requesting authorization
                UserCredential userCredential = GoogleWebAuthorizationBroker.AuthorizeAsync(clientSecrets, scopes, "user", CancellationToken.None).Result;
                //Authorization granted or not required (if the saved access token already available)
                if (userCredential.Token.IsExpired(userCredential.Flow.Clock))
                {
                    //The access token has expired, refreshing it
                    if (!userCredential.RefreshTokenAsync(CancellationToken.None).Result)
                    {
                        _logger.LogWarning("The access token has expired!");
                    }
                }
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(fromMail));
                email.To.Add(MailboxAddress.Parse(data.Email));

                string mailbody = $"Hello {data.FirstName} {data.LastName}, <br><br> We are pleased to inform that you will soon receive your parcel to {address.AddressLine1}!<br> Here is tracking number to check where it is now: <br><strong>";
                mailbody += tracking + "</strong> <br><br> Best regards, <br> Dėdė Bilas";
                email.Subject = "You are about to get your parcel";
                email.Body = new TextPart(TextFormat.Html) { Text = mailbody };
                

                using (var client = new SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    var oauth2 = new SaslMechanismOAuth2(fromMail, userCredential.Token.AccessToken);
                    client.Authenticate(oauth2);

                    await client.SendAsync(email);
                    client.Disconnect(true);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Could not send the message to receiver\n" + ex.ToString());
            }
        }

        public async void SendSender(RecipientDetails data, string tracking)
        {
            try
            {
                string clientId = _secrets.Id;
                string clientSecret = _secrets.Secret;
                string fromMail = _secrets.Email;
                string[] scopes = new string[] { "https://mail.google.com/" };
                ClientSecrets clientSecrets = new()
                {
                    ClientId = clientId,
                    ClientSecret = clientSecret
                };
                //Requesting authorization
                UserCredential userCredential = GoogleWebAuthorizationBroker.AuthorizeAsync(clientSecrets, scopes, "user", CancellationToken.None).Result;
                //Authorization granted or not required (if the saved access token already available)
                if (userCredential.Token.IsExpired(userCredential.Flow.Clock))
                {
                    //The access token has expired, refreshing it
                    if (!userCredential.RefreshTokenAsync(CancellationToken.None).Result)
                    {
                        _logger.LogWarning("The access token has expired!");
                    }
                }
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(fromMail));
                email.To.Add(MailboxAddress.Parse(data.Email));

                string mailbody = $"Hello {data.FirstName} {data.LastName}, <br><br> We are pleased to inform that you shipped your parcel successfully! Here is tracking number: <br><strong>";
                mailbody += tracking + "</strong> <br><br> Best regards, <br> Dėdė Bilas";
                email.Subject = "Shipped successfully!";
                email.Body = new TextPart(TextFormat.Html) { Text = mailbody };


                using (var client = new SmtpClient())
                {
                    client.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    var oauth2 = new SaslMechanismOAuth2(fromMail, userCredential.Token.AccessToken);
                    client.Authenticate(oauth2);

                    await client.SendAsync(email);
                    client.Disconnect(true);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning("Could not send the message to sender\n" + ex.ToString());
            }
        }
    }
}

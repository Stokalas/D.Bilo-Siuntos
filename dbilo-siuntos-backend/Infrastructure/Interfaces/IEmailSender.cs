using Infrastructure.Models;

namespace Infrastructure.Interfaces
{
    public interface IEmailSender
    {
        public void SendEmail(Address data, string tracking, bool isReceiver);
    }
}

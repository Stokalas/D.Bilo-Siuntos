using Infrastructure.Models;

namespace Infrastructure.Interfaces
{
    public interface IEmailSender
    {
        public void SendSender(Address data, string tracking);
        public void SendReceiver(Address data, string tracking);
    }
}

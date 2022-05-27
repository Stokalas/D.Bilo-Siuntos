using Infrastructure.Models;

namespace Infrastructure.Interfaces
{
    public interface IEmailSender
    {
        public void SendSender(RecipientDetails data, string tracking);
        public void SendReceiver(RecipientDetails data, Address address, string tracking);
    }
}

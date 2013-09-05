using Microsoft.AspNet.SignalR;

namespace IHomer.Clio.Services.Hubs
{
    public class ClioHub : Hub
    {
        public void Login(string user)
        {
            Clients.All.login(user);
        }
    }
}
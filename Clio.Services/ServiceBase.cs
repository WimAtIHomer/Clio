using IHomer.Clio.Entities;
using IHomer.Clio.Entities.Repositories;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Auth;

namespace IHomer.Clio.Services
{
    [Authenticate]
    public abstract class ServiceBase : Service
    {
        public UserRepository UserRepository { get; set; } //Injected by IOC

        private User _user;

        protected User User 
        { 
            get
            {
                if (_user != null) return _user;
                var session = SessionAs<AuthUserSession>();
                _user = UserRepository.GetByEmail(session.ProviderOAuthAccess[0].Email);
                return _user;
            } 
        }
    }
}

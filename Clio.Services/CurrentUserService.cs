using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Auth;
using IHomer.Clio.Entities;
using IHomer.Clio.Entities.Repositories;
using IHomer.Clio.Services.DTO;

namespace IHomer.Clio.Services
{
    public class CurrentUserService : Service
    {
        public UserRepository Repository { get; set; } //Injected by IOC

        public User Get(CurrentUserRequest request)
        {
            IAuthSession session = this.GetSession();
            return Repository.GetByEmail(session.ProviderOAuthAccess[0].Email);
        }
    }
}

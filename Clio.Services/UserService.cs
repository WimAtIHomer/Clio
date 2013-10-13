using IHomer.Clio.Services.Hubs;
using ServiceStack.Common;
using IHomer.Clio.Entities;
using IHomer.Clio.Entities.Repositories;
using IHomer.Clio.Services.DTO;

namespace IHomer.Clio.Services
{
    public class UserService : ServiceBase
    {
        public UserRepository Repository { get; set; } //Injected by IOC

        public object Get(UserIds userIds)
        {
            return userIds.Ids.IsEmpty()
                       ? Repository.GetAll()
                       : Repository.GetByIds(userIds.Ids);
        }

        public object Post(User user)
        {
            var newUser = Repository.Store(user);
            ClioHubManager.NewUser(User, newUser);
            return newUser;
        }

        public object Put(User user)
        {
            var editUser = Repository.Store(user);
            ClioHubManager.EditUser(User, editUser);
            return editUser;
        }

        public void Delete(UserIds userIds)
        {
            Repository.DeleteByIds(userIds.Ids);
        }
    }
}
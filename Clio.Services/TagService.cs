using IHomer.Clio.Entities;
using IHomer.Clio.Entities.Repositories;
using IHomer.Clio.Services.DTO;
using IHomer.Clio.Services.Hubs;
using ServiceStack.ServiceInterface.Auth;

namespace IHomer.Clio.Services
{
    public class TagService : ServiceBase
    {
        public TagRepository Repository { get; set; } //Injected by IOC
        public UserRepository UserRepository { get; set; } //Injected by IOC

        public object Get(TagSearch tag)
        {
            var request = base.Request;

            return tag == null || string.IsNullOrWhiteSpace(tag.Name)
                       ? Repository.GetAll()
                       : Repository.FindByName(tag.Name, tag.Top, tag.Descending);
        }

        public object Post(Tag tag)
        {
            var session = this.SessionAs<AuthUserSession>();
            var user = UserRepository.GetByEmail(session.ProviderOAuthAccess[0].Email);
            var newTag = Repository.Store(tag);
            ClioHubManager.NewTag(user, newTag);
            return newTag;
        }

        public object Put(Tag tag)
        {
            var session = this.SessionAs<AuthUserSession>();
            var user = UserRepository.GetByEmail(session.ProviderOAuthAccess[0].Email);
            var editTag = Repository.Store(tag);
            ClioHubManager.EditTag(user, editTag);
            return editTag;
        }

        public void Delete(TagIds tagIds)
        {
            Repository.DeleteByIds(tagIds.Ids);
        }
    }
}
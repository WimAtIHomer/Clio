using IHomer.Clio.Entities;
using IHomer.Clio.Entities.Repositories;
using IHomer.Clio.Services.DTO;
using IHomer.Clio.Services.Hubs;

namespace IHomer.Clio.Services
{
    public class TagService : ServiceBase
    {
        public TagRepository Repository { get; set; } //Injected by IOC

        public object Get(TagSearch tag)
        {
            return tag == null || string.IsNullOrWhiteSpace(tag.Name)
                       ? Repository.GetAll()
                       : Repository.FindByName(tag.Name, tag.Top, tag.Descending);
        }

        public object Post(Tag tag)
        {
            var newTag = Repository.Store(tag);
            ClioHubManager.NewTag(User, newTag);
            return newTag;
        }

        public object Put(Tag tag)
        {
            var editTag = Repository.Store(tag);
            ClioHubManager.EditTag(User, editTag);
            return editTag;
        }

        public void Delete(TagIds tagIds)
        {
            Repository.DeleteByIds(tagIds.Ids);
        }
    }
}
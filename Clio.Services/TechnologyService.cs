using IHomer.Clio.Services.Hubs;
using ServiceStack.Common;
using IHomer.Clio.Entities;
using IHomer.Clio.Entities.Repositories;
using IHomer.Clio.Services.DTO;

namespace IHomer.Clio.Services
{
    public class TechnologyService : ServiceBase
    {
        public TechnologyRepository Repository { get; set; } //Injected by IOC

        public object Get(TechnologyIds technologyIds)
        {
            return technologyIds.Ids.IsEmpty()
                       ? Repository.GetAll()
                       : Repository.GetByIds(technologyIds.Ids);
        }

        public object Post(Technology technology)
        {
            var newTechnology = Repository.Store(technology);
            ClioHubManager.NewTechnology(User, newTechnology);
            return newTechnology;
        }

        public object Put(Technology technology)
        {
            var editTechnology = Repository.Store(technology);
            ClioHubManager.EditTechnology(User, editTechnology);
            return editTechnology;
        }

        public void Delete(TechnologyIds technologyIds)
        {
            Repository.DeleteByIds(technologyIds.Ids);
        }
    }
}
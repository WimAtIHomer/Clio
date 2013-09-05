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
            return Repository.Store(technology);
        }

        public object Put(Technology technology)
        {
            return Repository.Store(technology);
        }

        public void Delete(TechnologyIds technologyIds)
        {
            Repository.DeleteByIds(technologyIds.Ids);
        }
    }
}
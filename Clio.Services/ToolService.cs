using ServiceStack.Common;
using IHomer.Clio.Entities;
using IHomer.Clio.Entities.Repositories;
using IHomer.Clio.Services.DTO;

namespace IHomer.Clio.Services
{
    public class ToolService : ServiceBase
    {
        public ToolRepository Repository { get; set; } //Injected by IOC

        public object Get(ToolIds toolIds)
        {
            return toolIds.Ids.IsEmpty()
                       ? Repository.GetAll()
                       : Repository.GetByIds(toolIds.Ids);
        }

        public object Post(Tool tool)
        {
            return Repository.Store(tool);
        }

        public object Put(Tool tool)
        {
            return Repository.Store(tool);
        }

        public void Delete(ToolIds toolIds)
        {
            Repository.DeleteByIds(toolIds.Ids);
        }
    }
}
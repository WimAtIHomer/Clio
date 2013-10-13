using IHomer.Clio.Services.Hubs;
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
            var newTool = Repository.Store(tool);
            ClioHubManager.NewTool(User, tool);
            return newTool;
        }

        public object Put(Tool tool)
        {
            var editTool = Repository.Store(tool);
            ClioHubManager.EditTool(User, tool);
            return editTool;
        }

        public void Delete(ToolIds toolIds)
        {
            Repository.DeleteByIds(toolIds.Ids);
        }
    }
}
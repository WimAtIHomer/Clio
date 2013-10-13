using IHomer.Clio.Services.Hubs;
using ServiceStack.Common;
using IHomer.Clio.Entities;
using IHomer.Clio.Entities.Repositories;
using IHomer.Clio.Services.DTO;

namespace IHomer.Clio.Services
{
    public class ProjectService : ServiceBase
    {
        public ProjectRepository Repository { get; set; } //Injected by IOC

        public object Get(ProjectIds projectIds)
        {
            return projectIds.Ids.IsEmpty()
                       ? Repository.GetAll()
                       : Repository.GetByIds(projectIds.Ids);
        }

        public object Post(Project project)
        {
            var newProject = Repository.Store(project);
            ClioHubManager.NewProject(User, newProject);
            return newProject;
        }

        public object Put(Project project)
        {
            var editProject = Repository.Store(project); 
            ClioHubManager.EditProject(User, editProject);
            return editProject;
        }

        public void Delete(ProjectIds projectIds)
        {
            Repository.DeleteByIds(projectIds.Ids);
        }
    }
}
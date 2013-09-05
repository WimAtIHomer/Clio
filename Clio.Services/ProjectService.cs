using IHomer.Clio.Services.Hubs;
using ServiceStack.Common;
using IHomer.Clio.Entities;
using IHomer.Clio.Entities.Repositories;
using IHomer.Clio.Services.DTO;
using ServiceStack.ServiceInterface.Auth;

namespace IHomer.Clio.Services
{
    public class ProjectService : ServiceBase
    {
        public ProjectRepository Repository { get; set; } //Injected by IOC
        public UserRepository UserRepository { get; set; } //Injected by IOC

        public object Get(ProjectIds projectIds)
        {
            return projectIds.Ids.IsEmpty()
                       ? Repository.GetAll()
                       : Repository.GetByIds(projectIds.Ids);
        }

        public object Post(Project project)
        {
            var session = this.SessionAs<AuthUserSession>();
            var user = UserRepository.GetByEmail(session.ProviderOAuthAccess[0].Email);
            var newProject = Repository.Store(project);
            ClioHubManager.NewProject(user, newProject);
            return newProject;
        }

        public object Put(Project project)
        {
            var session = this.SessionAs<AuthUserSession>();
            var user = UserRepository.GetByEmail(session.ProviderOAuthAccess[0].Email);
            var editProject = Repository.Store(project); 
            ClioHubManager.EditProject(user, editProject);
            return editProject;
        }

        public void Delete(ProjectIds projectIds)
        {
            Repository.DeleteByIds(projectIds.Ids);
        }
    }
}
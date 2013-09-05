using System;
using IHomer.Clio.Entities;
using Microsoft.AspNet.SignalR;

namespace IHomer.Clio.Services.Hubs
{
    public class ClioHubManager
    {
        private readonly static Lazy<ClioHubManager> _instance = new Lazy<ClioHubManager>(() => new ClioHubManager());

        private ClioHubManager()
        {
        }

        public static ClioHubManager Instance
        {
            get
            {
                return _instance.Value;
            }
        }

        public static void NewUser(User user, User user2)
        {
            var clients = GlobalHost.ConnectionManager.GetHubContext<ClioHub>().Clients;
            clients.All.addUser(user, user2);
        }

        public static void EditUser(User user, User user2)
        {
            var clients = GlobalHost.ConnectionManager.GetHubContext<ClioHub>().Clients;
            clients.All.editUser(user, user2);
        }

        public static void NewProject(User user, Project project)
        {
            var clients = GlobalHost.ConnectionManager.GetHubContext<ClioHub>().Clients;
            clients.All.addProject(user, project);
        }

        public static void EditProject(User user, Project project)
        {
            var clients = GlobalHost.ConnectionManager.GetHubContext<ClioHub>().Clients;
            clients.All.editProject(user, project);
        }

        public static void NewTechnology(User user, Technology technology)
        {
            var clients = GlobalHost.ConnectionManager.GetHubContext<ClioHub>().Clients;
            clients.All.addTechnology(user, technology);
        }

        public static void EditTechnology(User user, Technology technology)
        {
            var clients = GlobalHost.ConnectionManager.GetHubContext<ClioHub>().Clients;
            clients.All.editTechnology(user, technology);
        }

        public static void NewTag(User user, Tag tag)
        {
            var clients = GlobalHost.ConnectionManager.GetHubContext<ClioHub>().Clients;
            clients.All.addTag(user, tag);
        }

        public static void EditTag(User user, Tag tag)
        {
            var clients = GlobalHost.ConnectionManager.GetHubContext<ClioHub>().Clients;
            clients.All.editTag(user, tag);
        }

        public static void NewTool(User user, Tool tool)
        {
            var clients = GlobalHost.ConnectionManager.GetHubContext<ClioHub>().Clients;
            clients.All.addTool(user, tool);
        }

        public static void EditTool(User user, Tool tool)
        {
            var clients = GlobalHost.ConnectionManager.GetHubContext<ClioHub>().Clients;
            clients.All.editTool(user, tool);
        }

        public static void NewReview(User user, Review review)
        {
            var clients = GlobalHost.ConnectionManager.GetHubContext<ClioHub>().Clients;
            clients.All.addReview(user, review);
        }

        public static void EditReview(User user, Review review)
        {
            var clients = GlobalHost.ConnectionManager.GetHubContext<ClioHub>().Clients;
            clients.All.editReview(user, review);
        }
    }
}
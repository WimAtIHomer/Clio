using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.OrmLite;

namespace IHomer.Clio.Entities.Repositories
{
    public class ProjectRepository: BaseRepository<Project>
    {
        public override List<Project> GetAll()
        {
            var projects = base.GetAll();
            var reviews = GetReviewCountsForProjects();
            foreach (var project in projects)
            {
                project.Reviews = reviews.ContainsKey(project.Id) ? reviews[project.Id] : 0;
            }
            return projects;
        }

        public Dictionary<long, int> GetReviewCountsForProjects()
        {
            const string sql = "SELECT ProjectId as [Key], count(1) as [Value] FROM Reviews GROUP BY ProjectId";
            using (var db = DbFactory.OpenDbConnection())
            {
                return db.Query<ReviewCount>(sql).ToDictionary(k => k.Key, v => v.Value);
            }
        }
    }
}

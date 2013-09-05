using System.Collections.Generic;
using System.Linq;
using ServiceStack.OrmLite;

namespace IHomer.Clio.Entities.Repositories
{
    public class ToolRepository: BaseRepository<Tool>
    {
        public override List<Tool> GetAll()
        {
            var tools = base.GetAll();
            var reviews = GetReviewCountsForTools();
            using (var db = DbFactory.OpenDbConnection())
            {
                var toolTags = db.Select<ToolTag>();
                foreach (var tool in tools)
                {
                    tool.Tags = toolTags.Where(t => t.ToolId == tool.Id).Select(t => t.TagId).ToList();
                }
            }
            foreach (var tool in tools)
            {
                tool.Reviews = reviews.ContainsKey(tool.Id) ? reviews[tool.Id] : 0;
            }
            return tools;
        }

        private Dictionary<long, int> GetReviewCountsForTools()
        {
            const string sql = "SELECT toolId as [Key], count(1) as [Value] FROM ToolReviews GROUP BY toolId";
            using (var db = DbFactory.OpenDbConnection())
            {
                return db.Query<ReviewCount>(sql).ToDictionary(k => k.Key, v => v.Value);
            }
        }

        public override Tool Store(Tool objT)
        {
            var tool = base.Store(objT);
            tool.Tags = objT.Tags;
            using (var db = DbFactory.OpenDbConnection())
            {
                var toolTags = db.Select<ToolTag>(t => t.ToolId == tool.Id);
                foreach (var toolTag in toolTags)
                {
                    if (!tool.Tags.Contains(toolTag.TagId))
                    {
                        db.Delete<ToolTag>(toolTag);
                    }
                }
                foreach (var tag in tool.Tags)
                {
                    if (toolTags.All(t => t.TagId != tag))
                    {
                        db.InsertParam(new ToolTag() { TagId = tag, ToolId = tool.Id });
                    }
                }
            }
            return tool;
        }

    }
}

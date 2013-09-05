using System.Collections.Generic;
using System.Linq;
using ServiceStack.OrmLite;

namespace IHomer.Clio.Entities.Repositories
{
    public class TechnologyRepository: BaseRepository<Technology>
    {
        public override List<Technology> GetAll()
        {
            var technologies = base.GetAll();
            var reviews = GetReviewCountsForTechnologies();

            using (var db = DbFactory.OpenDbConnection())
            {
                var technologyTags = db.Select<TechnologyTag>();
                foreach (var technology in technologies)
                {
                    technology.Tags = technologyTags.Where(t => t.TechnologyId == technology.Id).Select(t => t.TagId).ToList();
                }
            }
            foreach (var technology in technologies)
            {
                technology.Reviews = reviews.ContainsKey(technology.Id) ? reviews[technology.Id] : 0;
            }
            return technologies;
        }

        private Dictionary<long, int> GetReviewCountsForTechnologies()
        {
            const string sql = "SELECT technologyId as [Key], count(1) as [Value] FROM TechnologyReviews GROUP BY technologyId";
            using (var db = DbFactory.OpenDbConnection())
            {
                return db.Query<ReviewCount>(sql).ToDictionary(k => k.Key, v => v.Value);
            }
        }

        public override Technology Store(Technology objT)
        {
            var technology = base.Store(objT);
            technology.Tags = objT.Tags;
            using (var db = DbFactory.OpenDbConnection())
            {
                var technologyTags = db.Select<TechnologyTag>(t => t.TechnologyId == technology.Id);
                foreach (var technologyTag in technologyTags)
                {
                    if (!technology.Tags.Contains(technologyTag.TagId))
                    {
                        db.Delete<TechnologyTag>(technologyTag);
                    }
                }
                foreach (var tag in technology.Tags)
                {
                    if (technologyTags.All(t => t.TagId != tag))
                    {
                        db.InsertParam(new TechnologyTag() {TagId = tag, TechnologyId = technology.Id});
                    }
                }
            }
            return technology;
        }
    }
}

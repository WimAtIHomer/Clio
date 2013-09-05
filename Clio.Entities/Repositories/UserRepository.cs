using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.Common;
using ServiceStack.DesignPatterns.Model;
using ServiceStack.OrmLite;

namespace IHomer.Clio.Entities.Repositories
{
    public class UserRepository: BaseRepository<User>
    {
        public override List<User> GetAll()
        {
            var users = base.GetAll();
            var reviews = GetReviewCountsForUsers();
            foreach (var user in users)
            {
                user.Reviews = reviews.ContainsKey(user.Id) ? reviews[user.Id] : 0;
            }
            return users;
        }

        public User GetByEmail(string email)
        {
            using (var db = DbFactory.OpenDbConnection())
            {
                return db.FirstOrDefault<User>(u => u.Email == email);
            }
        }

        public Dictionary<long, int> GetReviewCountsForUsers()
        {
            const string sql = "SELECT UserId as [Key], count(1) as [Value] FROM TechnologyReviews GROUP BY UserId";
            using (var db = DbFactory.OpenDbConnection())
            {
                return db.Query<ReviewCount>(sql).ToDictionary(k => k.Key, v => v.Value);
            }
        }
    }
}

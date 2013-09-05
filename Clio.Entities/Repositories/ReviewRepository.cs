using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.OrmLite;

namespace IHomer.Clio.Entities.Repositories
{
    public class ReviewRepository
    {
        public const string TECHNOLOGY_TYPE = "Technology";
        public const string TOOL_TYPE = "Tool";

        public List<Review> GetAll()
        {
            using (var db = DbFactory.OpenDbConnection())
            {
                return db.Select<Review>();
            }
        }

        public Review GetByIdAndType(long id, string type)
        {
            using (var db = DbFactory.OpenDbConnection())
            {
                return db.SelectParam<Review>(review => review.Id == id && review.Type == type)[0];
            }
        }
    }
}

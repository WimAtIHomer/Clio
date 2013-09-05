using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.Common;
using ServiceStack.OrmLite;

namespace IHomer.Clio.Entities.Repositories
{
    public class TagRepository : BaseRepository<Tag>
    {
        public List<Tag> FindByName(string name, int top, bool descending)
        {
            var sql = "SELECT TOP (@Top) * FROM Tags WHERE Name LIKE '%@Name%' ORDER BY Name";
            if (descending) sql += " DESC";
            using (var dbConnection = DbFactory.OpenDbConnection())
            {
                return dbConnection.Query<Tag>(sql, new { Name = name, Top = top});
            }
        }
    }
}

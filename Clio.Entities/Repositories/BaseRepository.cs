using System.Collections.Generic;
using ServiceStack.Common;
using ServiceStack.DesignPatterns.Model;
using ServiceStack.OrmLite;

namespace IHomer.Clio.Entities.Repositories
{
    public class BaseRepository<T> where T : class, IHasId<long>, new()
    {
        public virtual List<T> GetByIds(long[] ids)
        {
            using (var db = DbFactory.OpenDbConnection())
            {
                return db.GetByIds<T>(ids);
            }
        }

        public virtual List<T> GetAll()
        {
            using (var db = DbFactory.OpenDbConnection())
            {
                return db.Select<T>();
            }
        }

        public virtual T Store(T objT)
        {
            using (var db = DbFactory.OpenDbConnection())
            {
                var existing = db.FirstOrDefault<T>(x => x.Id == objT.Id);
                if (existing == null)
                {
                    var id = db.InsertParam(objT, true);
                    existing = db.GetByIdParam<T>(id);
                }
                else
                {
                    existing.PopulateWith(objT);
                    db.UpdateParam(existing);
                }
                return existing;
            }
        }

        public virtual void DeleteByIds(params long[] ids)
        {
            using (var db = DbFactory.OpenDbConnection())
            {
                db.DeleteByIds<T>(ids);
            }
        }
    }
}

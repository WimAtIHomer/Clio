using System.Configuration;
using System.Data;
using ServiceStack.OrmLite;

namespace IHomer.Clio.Entities.Repositories
{
    internal static class DbFactory
    {
        private static readonly OrmLiteConnectionFactory _dbFactory = new OrmLiteConnectionFactory(ConfigurationManager.ConnectionStrings["Clio"].ConnectionString, SqlServerDialect.Provider); 

        public static IDbConnection OpenDbConnection()
        {
            return _dbFactory.OpenDbConnection();
        }
    }
}

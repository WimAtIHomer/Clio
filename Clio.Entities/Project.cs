using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;
using ServiceStack.ServiceHost;

namespace IHomer.Clio.Entities
{
    [Route("/project", "POST, PUT")]
    public partial class Project : IHasId<long>, IReturn<Project>
    {
        [Ignore]
        public int Reviews { get; set; }
    }
}

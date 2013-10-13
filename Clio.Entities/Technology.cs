using System.Collections.Generic;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;
using ServiceStack.ServiceHost;

namespace IHomer.Clio.Entities
{
    [Route("/technology", "POST, PUT")]
    public partial class Technology : IHasId<long>, IReturn<Technology>
    {
        [Ignore]
        public List<long> Tags { get; set; }

        [Ignore]
        public int Reviews { get; set; }
    }
}

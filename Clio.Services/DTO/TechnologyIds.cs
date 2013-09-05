using System.Collections.Generic;
using ServiceStack.ServiceHost;
using IHomer.Clio.Entities;

namespace IHomer.Clio.Services.DTO
{
    [Route("/technology", "GET")]
    [Route("/technology/{Ids}", "GET,DELETE")]
    public class TechnologyIds : IReturn<List<Technology>>
    {
        public long[] Ids { get; set; }

        public TechnologyIds(params long[] ids)
        {
            Ids = ids;
        }
    }
}

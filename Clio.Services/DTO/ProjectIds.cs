using System.Collections.Generic;
using ServiceStack.ServiceHost;
using IHomer.Clio.Entities;

namespace IHomer.Clio.Services.DTO
{
    [Route("/project", "GET")]
    [Route("/project/{Ids}", "GET,DELETE")]
    public class ProjectIds : IReturn<List<Project>>
    {
        public long[] Ids { get; set; }

        public ProjectIds(params long[] ids)
        {
            Ids = ids;
        }
    }
}

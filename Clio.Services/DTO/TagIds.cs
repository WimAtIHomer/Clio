using System.Collections.Generic;
using ServiceStack.ServiceHost;
using IHomer.Clio.Entities;

namespace IHomer.Clio.Services.DTO
{
    [Route("/tag/{ids}", "GET,DELETE")]
    [Route("/tag", "DELETE")]
    public class TagIds : IReturn<List<Tag>>
    {
        public long[] Ids { get; set; }

        public TagIds(params long[] ids)
        {
            Ids = ids;
        }
    }
}

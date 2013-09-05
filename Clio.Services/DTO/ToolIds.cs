using System.Collections.Generic;
using ServiceStack.ServiceHost;
using IHomer.Clio.Entities;

namespace IHomer.Clio.Services.DTO
{
    [Route("/tool", "GET")]
    [Route("/tool/{Ids}", "GET,DELETE")]
    public class ToolIds : IReturn<List<Tool>>
    {
        public long[] Ids { get; set; }

        public ToolIds(params long[] ids)
        {
            Ids = ids;
        }
    }
}

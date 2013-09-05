using System.Collections.Generic;
using ServiceStack.ServiceHost;
using IHomer.Clio.Entities;

namespace IHomer.Clio.Services.DTO
{
    [Route("/toolreview", "GET")]
    [Route("/toolreview/{Ids}", "GET,DELETE")]
    public class ToolReviewIds : IReturn<List<ToolReview>>
    {
        public long[] Ids { get; set; }

        public ToolReviewIds(params long[] ids)
        {
            Ids = ids;
        }
    }
}

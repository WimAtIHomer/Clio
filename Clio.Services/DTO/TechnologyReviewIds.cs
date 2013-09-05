using System.Collections.Generic;
using ServiceStack.ServiceHost;
using IHomer.Clio.Entities;

namespace IHomer.Clio.Services.DTO
{
    [Route("/technologyreview", "GET")]
    [Route("/technologyreview/{Ids}", "GET,DELETE")]
    public class TechnologyReviewIds : IReturn<List<TechnologyReview>>
    {
        public long[] Ids { get; set; }

        public TechnologyReviewIds(params long[] ids)
        {
            Ids = ids;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.DesignPatterns.Model;
using ServiceStack.ServiceHost;

namespace IHomer.Clio.Entities
{
    [Route("/technologyreview", "POST")]
    [Route("/technologyreview/{Id}", "PUT")]
    public partial class TechnologyReview : IHasId<long>, IReturn<TechnologyReview>
    {
    }
}

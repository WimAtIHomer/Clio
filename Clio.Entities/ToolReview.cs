using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.DesignPatterns.Model;
using ServiceStack.ServiceHost;

namespace IHomer.Clio.Entities
{
    [Route("/toolreview", "POST")]
    [Route("/toolreview/{Id}", "PUT")]
    public partial class ToolReview : IHasId<long>, IReturn<ToolReview>
    {
    }
}

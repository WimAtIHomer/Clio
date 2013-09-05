using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.DataAnnotations;
using ServiceStack.DesignPatterns.Model;
using ServiceStack.ServiceHost;

namespace IHomer.Clio.Entities
{
    [Route("/tool", "POST")]
    [Route("/tool/{Id}", "PUT")]
    public partial class Tool : IHasId<long>, IReturn<Tool>
    {
        [Ignore]
        public List<long> Tags { get; set; }

        [Ignore]
        public int Reviews { get; set; }
    }
}

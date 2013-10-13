using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.DesignPatterns.Model;
using ServiceStack.ServiceHost;

namespace IHomer.Clio.Entities
{
    [Route("/tag", "POST, PUT")]
    public partial class Tag : IHasId<long>, IReturn<Tag>
    {
    }
}

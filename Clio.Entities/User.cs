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
    [Route("/user", "POST, PUT")]
    public partial class User : IHasId<long>, IReturn<User>
    {
        [Ignore]
        public int Reviews { get; set; }
    }
}

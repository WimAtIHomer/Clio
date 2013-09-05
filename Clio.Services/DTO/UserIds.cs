using System.Collections.Generic;
using ServiceStack.ServiceHost;
using IHomer.Clio.Entities;

namespace IHomer.Clio.Services.DTO
{
    [Route("/user", "GET")]
    [Route("/user/{Ids}", "GET,DELETE")]
    public class UserIds : IReturn<List<User>>
    {
        public long[] Ids { get; set; }

        public UserIds(params long[] ids)
        {
            Ids = ids;
        }
    }
}

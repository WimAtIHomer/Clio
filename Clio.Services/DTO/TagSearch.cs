using System.Collections.Generic;
using ServiceStack.ServiceHost;
using IHomer.Clio.Entities;

namespace IHomer.Clio.Services.DTO
{
    [Route("/tag", "GET")]
    public class TagSearch : IReturn<List<Tag>>
    {
        public long[] Ids { get; set; }
        public string Name { get; set; }
        public bool Descending { get; set; }
        public int Top { get; set; }
    }
}

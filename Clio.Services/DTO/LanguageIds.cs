using System.Collections.Generic;
using ServiceStack.ServiceHost;
using IHomer.Clio.Entities;

namespace IHomer.Clio.Services.DTO
{
    [Route("/language", "GET")]
    [Route("/language/{Ids}", "GET,DELETE")]
    public class LanguageIds : IReturn<List<Language>>
    {
        public long[] Ids { get; set; }

        public LanguageIds(params long[] ids)
        {
            Ids = ids;
        }
    }
}

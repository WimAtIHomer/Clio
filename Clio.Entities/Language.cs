using ServiceStack.DesignPatterns.Model;
using ServiceStack.ServiceHost;

namespace IHomer.Clio.Entities
{
    [Route("/language", "POST")]
    [Route("/language/{Id}", "PUT")]
    public partial class Language : IHasId<long>, IReturn<Language>
    {
    }
}

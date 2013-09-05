using ServiceStack.ServiceHost;

namespace IHomer.Clio.Services.DTO
{
    [Route("/currentuser", "GET")]
    public class CurrentUserRequest : ServiceBase
    {
    }
}

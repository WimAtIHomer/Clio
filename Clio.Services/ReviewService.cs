using IHomer.Clio.Entities;
using IHomer.Clio.Entities.Repositories;
using IHomer.Clio.Services.DTO;

namespace IHomer.Clio.Services
{
    public class ReviewService : ServiceBase
    {
        public ReviewRepository Repository { get; set; } //Injected by IOC

        public object Get(ReviewSearch tag)
        {
            return Repository.GetAll();
        }
    }
}
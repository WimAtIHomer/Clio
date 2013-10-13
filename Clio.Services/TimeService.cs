using System;
using IHomer.Clio.Services.DTO;

namespace IHomer.Clio.Services
{
    public class TimeService : ServiceBase
    {
        public TimeResponse Get(TimeRequest request)
        {
            return new TimeResponse() {Time = DateTime.Now};
        }
    }
}

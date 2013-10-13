using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;
using Clio.App_Start;
using IHomer.Clio.Entities;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Json;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using log4net.Config;

namespace Clio
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            XmlConfigurator.Configure();
            RouteTable.Routes.MapHubs();
            var serializerSettings = new JsonSerializerSettings
            {
                ContractResolver = new FilteredCamelCasePropertyNamesContractResolver 
                        {
                            AssembliesToInclude = { typeof(Review).Assembly }
                        } 
            };
            var jsonNetSerializer = new JsonNetSerializer(serializerSettings);
            GlobalHost.DependencyResolver.Register(typeof(IJsonSerializer), () => jsonNetSerializer); 
        }

        void Application_End(object sender, EventArgs e)
        {
            //  Code that runs on application shutdown

        }

        void Application_Error(object sender, EventArgs e)
        {
            // Code that runs when an unhandled error occurs

        }
    }
}

using ServiceStack.Authentication.OpenId;
using ServiceStack.Configuration;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Auth;
using ServiceStack.Text;
using ServiceStack.WebHost.Endpoints;
using IHomer.Clio.Entities.Repositories;
using IHomer.Clio.Services;

[assembly: WebActivator.PreApplicationStartMethod(typeof(Clio.App_Start.AppHost), "Start")]

namespace Clio.App_Start
{
	public class AppHost
		: AppHostBase
	{		
		public AppHost() //Tell ServiceStack the name and where to find your web services
			: base("ClioService", typeof(TagService).Assembly) { }

		public override void Configure(Funq.Container container)
		{
			//Set JSON web services to return idiomatic JSON camelCase properties
			JsConfig.EmitCamelCaseNames = true;
            JsConfig.DateHandler = JsonDateHandler.ISO8601;
		
			//Enable Authentication
			ConfigureAuth(container);

			//Register all your dependencies
			container.Register(new LanguageRepository());
            container.Register(new ProjectRepository());
            container.Register(new ReviewRepository());
            container.Register(new TechnologyRepository());
            container.Register(new TechnologyReviewRepository());
            container.Register(new ToolRepository());
            container.Register(new ToolReviewRepository());
            container.Register(new TagRepository());
            container.Register(new UserRepository());
        }

		// Uncomment to enable ServiceStack Authentication and CustomUserSession
		private void ConfigureAuth(Funq.Container container)
		{
			var appSettings = new AppSettings();

			//Default route: /auth/{provider}
			Plugins.Add(new AuthFeature(() => new CustomUserSession(),
				new IAuthProvider[] {
					new GoogleOpenIdOAuthProvider(appSettings)
				})); 

			//Default route: /register
			//Plugins.Add(new RegistrationFeature()); 

			//Requires ConnectionString configured in Web.Config
            //var connectionString = ConfigurationManager.ConnectionStrings["AppDb"].ConnectionString;
            //container.Register<IDbConnectionFactory>(c =>
            //    new OrmLiteConnectionFactory(connectionString, SqlServerDialect.Provider));

            //container.Register<IUserAuthRepository>(c =>
            //    new OrmLiteAuthRepository(c.Resolve<IDbConnectionFactory>()));

            //var authRepo = (OrmLiteAuthRepository)container.Resolve<IUserAuthRepository>();
            //authRepo.CreateMissingTables();
		}

		public static void Start()
		{
			new AppHost().Init();
		}
	}
}

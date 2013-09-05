using System.Web.UI;
using ServiceStack.CacheAccess;
using ServiceStack.ServiceInterface;
using ServiceStack.ServiceInterface.Auth;
using ServiceStack.WebHost.Endpoints;

namespace Clio.App_Start
{
	//A customizeable typed UserSession that can be extended with your own properties
	public class CustomUserSession : AuthUserSession
	{
		public string CustomProperty { get; set; }
	}

	public class PageBase : Page
	{
        /// <summary>
        /// Typed UserSession
        /// </summary>
        private object _userSession;
        protected virtual TUserSession SessionAs<TUserSession>()
        {
            return (TUserSession)(_userSession ?? (_userSession = Cache.SessionAs<TUserSession>()));
        }

        protected CustomUserSession UserSession
        {
            get
            {
                return SessionAs<CustomUserSession>();
            }
        }

        public new ICacheClient Cache
        {
            get { return AppHostBase.Resolve<ICacheClient>(); }
        }

        private ISessionFactory _sessionFactory;
        public virtual ISessionFactory SessionFactory
        {
            get { return _sessionFactory ?? (_sessionFactory = AppHostBase.Resolve<ISessionFactory>()) ?? new SessionFactory(Cache); }
        }

        /// <summary>
        /// Dynamic Session Bag
        /// </summary>
        private ISession _session;
        public new ISession Session
        {
            get
            {
                return _session ?? (_session = SessionFactory.GetOrCreateSession());
            }
        }

        public void ClearSession()
        {
            _userSession = null;
            Cache.Remove(SessionFeature.GetSessionKey());
        }
	}
}
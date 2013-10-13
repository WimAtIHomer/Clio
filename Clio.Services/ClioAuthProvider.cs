using System;
using IHomer.Clio.Entities.Repositories;
using ServiceStack.Authentication.OpenId;
using ServiceStack.Configuration;
using ServiceStack.ServiceInterface.Auth;

namespace IHomer.Clio.Services
{
    public class ClioAuthProvider : GoogleOpenIdOAuthProvider
    {
        public ClioAuthProvider(IResourceManager appSettings)
            : base(appSettings)
        {
        }

        public override bool IsAuthorized(IAuthSession session, IOAuthTokens tokens, Auth request = null)
        {
            if (tokens != null && !string.IsNullOrEmpty(tokens.Email))
            {
                var repository = new UserRepository();
                var user = repository.GetByEmail(tokens.Email);
                if (user == null)
                {
                    throw new InvalidOperationException("You are not a registered user!");
                    return false;
                }
            }
            if (request != null)
            {
                if (!LoginMatchesSession(session, request.UserName)) return false;
            }


            // For OpenId, AccessTokenSecret is null/empty, but UserId is populated w/ authenticated url from openId providers            
            return tokens != null && !string.IsNullOrEmpty(tokens.UserId);
        }

    }
}

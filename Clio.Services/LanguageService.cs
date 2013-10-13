using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.Common;
using ServiceStack.ServiceInterface;
using IHomer.Clio.Entities;
using IHomer.Clio.Entities.Repositories;
using IHomer.Clio.Services.DTO;

namespace IHomer.Clio.Services
{
    public class LanguageService : ServiceBase
    {
        public LanguageRepository Repository { get; set; } //Injected by IOC

        public LanguageService() : base()
        {
            
        }

        public object Get(LanguageIds languageIds)
        {
            return languageIds.Ids.IsEmpty()
                       ? Repository.GetAll()
                       : Repository.GetByIds(languageIds.Ids);
        }

        public object Post(Language language)
        {
            return Repository.Store(language);
        }

        public object Put(Language language)
        {
            return Repository.Store(language);
        }

        public void Delete(LanguageIds languageIds)
        {
            Repository.DeleteByIds(languageIds.Ids);
        }
    }
}
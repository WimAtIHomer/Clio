using System;
using ServiceStack.Common;
using IHomer.Clio.Entities;
using IHomer.Clio.Entities.Repositories;
using IHomer.Clio.Services.DTO;

namespace IHomer.Clio.Services
{
    public class TechnologyReviewService : ServiceBase
    {
        public TechnologyReviewRepository Repository { get; set; } //Injected by IOC
        public ReviewRepository ReviewRepository { get; set; } //Injected by IOC

        public object Get(TechnologyReviewIds technologyReviewIds)
        {
            return technologyReviewIds.Ids.IsEmpty()
                       ? Repository.GetAll()
                       : Repository.GetByIds(technologyReviewIds.Ids);
        }

        public object Post(TechnologyReview technologyReview)
        {
            technologyReview.Created = DateTime.Now;
            var review = Repository.Store(technologyReview);
            return ReviewRepository.GetByIdAndType(review.Id, ReviewRepository.TECHNOLOGY_TYPE);
        }

        public object Put(TechnologyReview technologyReview)
        {
            var review = Repository.Store(technologyReview);
            return ReviewRepository.GetByIdAndType(review.Id, ReviewRepository.TECHNOLOGY_TYPE);
        }

        public void Delete(TechnologyReviewIds technologyReviewIds)
        {
            Repository.DeleteByIds(technologyReviewIds.Ids);
        }
    }
}
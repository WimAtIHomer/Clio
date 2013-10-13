using System;
using IHomer.Clio.Services.Hubs;
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
        public TechnologyRepository TechnologyRepository { get; set; } //Injected by IOC
        public ProjectRepository ProjectRepository { get; set; } //Injected by IOC

        public object Get(TechnologyReviewIds technologyReviewIds)
        {
            return technologyReviewIds.Ids.IsEmpty()
                       ? Repository.GetAll()
                       : Repository.GetByIds(technologyReviewIds.Ids);
        }

        public object Post(TechnologyReview technologyReview)
        {

            technologyReview.Created = DateTime.Now;
            var tReview = Repository.Store(technologyReview);
            var review = ReviewRepository.GetByIdAndType(tReview.Id, ReviewRepository.TECHNOLOGY_TYPE);
            ClioHubManager.NewReview(User, review);
            return review;
        }

        public object Put(TechnologyReview technologyReview)
        {
            var tReview = Repository.Store(technologyReview);
            var review = ReviewRepository.GetByIdAndType(tReview.Id, ReviewRepository.TECHNOLOGY_TYPE);
            ClioHubManager.EditReview(User, review);
            return review;
        }

        public void Delete(TechnologyReviewIds technologyReviewIds)
        {
            Repository.DeleteByIds(technologyReviewIds.Ids);
        }
    }
}
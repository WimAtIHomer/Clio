using System;
using IHomer.Clio.Services.Hubs;
using ServiceStack.Common;
using IHomer.Clio.Entities;
using IHomer.Clio.Entities.Repositories;
using IHomer.Clio.Services.DTO;

namespace IHomer.Clio.Services
{
    public class ToolReviewService : ServiceBase
    {
        public ToolReviewRepository Repository { get; set; } //Injected by IOC
        public ReviewRepository ReviewRepository { get; set; } //Injected by IOC
        public ToolRepository ToolRepository { get; set; } //Injected by IOC
        public ProjectRepository ProjectRepository { get; set; } //Injected by IOC

        public object Get(ToolReviewIds toolReviewIds)
        {
            return toolReviewIds.Ids.IsEmpty()
                       ? Repository.GetAll()
                       : Repository.GetByIds(toolReviewIds.Ids);
        }

        public object Post(ToolReview toolReview)
        {
            toolReview.Created = DateTime.Now;
            var tReview = Repository.Store(toolReview);
            var review = ReviewRepository.GetByIdAndType(tReview.Id, ReviewRepository.TOOL_TYPE);
            ClioHubManager.NewReview(User, review);
            return review;
        }

        public object Put(ToolReview toolReview)
        {
            var tReview = Repository.Store(toolReview);
            var review = ReviewRepository.GetByIdAndType(tReview.Id, ReviewRepository.TOOL_TYPE);
            ClioHubManager.EditReview(User, review);
            return review;
        }

        public void Delete(ToolReviewIds technologyReviewIds)
        {
            Repository.DeleteByIds(technologyReviewIds.Ids);
        }
    }
}
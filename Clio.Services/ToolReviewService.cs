using System;
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

        public object Get(ToolReviewIds toolReviewIds)
        {
            return toolReviewIds.Ids.IsEmpty()
                       ? Repository.GetAll()
                       : Repository.GetByIds(toolReviewIds.Ids);
        }

        public object Post(ToolReview toolReview)
        {
            toolReview.Created = DateTime.Now;
            var review = Repository.Store(toolReview);
            return ReviewRepository.GetByIdAndType(review.Id, ReviewRepository.TOOL_TYPE);
        }

        public object Put(ToolReview toolReview)
        {
            var review = Repository.Store(toolReview);
            return ReviewRepository.GetByIdAndType(review.Id, ReviewRepository.TOOL_TYPE);
        }

        public void Delete(ToolReviewIds technologyReviewIds)
        {
            Repository.DeleteByIds(technologyReviewIds.Ids);
        }
    }
}
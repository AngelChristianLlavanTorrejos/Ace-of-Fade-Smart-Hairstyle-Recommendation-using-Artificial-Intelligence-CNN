export class BarberReviewContr {
  constructor (model, view, id) {
    this.model = model;
    this.view = view;
    this.id = id;
  }

  async init () {
    const toReviewData = await this.model.GetBarberToBeReview(this.id);
    await this.view.renderToReview(toReviewData);
    await this.view.onReview (toReviewData, async (submittedReview) => {
      const result = await this.model.reviewBarber(submittedReview);

      console.log(result);
    })

    const barberReviewsData = await this.model.getBarberReviews();
    await this.view.renderCustomersReview(barberReviewsData);
  }
}
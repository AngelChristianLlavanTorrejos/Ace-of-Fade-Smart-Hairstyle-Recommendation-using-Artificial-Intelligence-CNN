export class BarberReviewsContr {
  constructor (model, view, id) {
    this.model = model;
    this.view = view;
  }

  async init () {
    const barberReviewsData = await this.model.getBarberReviews();
    await this.view.renderCustomersReview(barberReviewsData);
  }
}
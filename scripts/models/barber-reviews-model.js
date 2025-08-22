export class BarberReviewsModel {
  async getBarberReviews () {
    try {
      const res = await fetch('https://localhost:7109/api/BarberReview/GetBarberReviews');

      if (!res.ok) throw new Error(`Response Status: ${res.status}`);

      return await res.json();
    } catch (error) { 
      console.error(error);
    }
  }
}
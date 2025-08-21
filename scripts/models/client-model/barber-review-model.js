export class BarberReviewModel {
  async GetBarberToBeReview (id) {
    try {
      const res = await  fetch(`https://localhost:7109/api/BarberReview/GetBarberToBeReview/${id}`);

      if (!res.ok) throw new Error(`Response Status: ${res.status}`);

      return await res.json();
    } catch (error) {
      
    }
  }

  async reviewBarber (reviewData) {
    try {
      const res = await fetch('https://localhost:7109/api/BarberReview/ReviewBarber', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      })

      if (!res.ok) {
        return await res.json();
      }

        return await res.json();
    } catch (error) {
      console.error(error);
    }

  }

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
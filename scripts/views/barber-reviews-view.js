export class BarberReviewsView {
  constructor () {
    this.customersReviewContainer = document.querySelector('.js-customers-review-container');
  }

  async renderCustomersReview (customersReview) {
    this.customersReviewContainer.innerHTML = '';

    if (customersReview.length === 0) {
      const paragraph = document.createElement('p');
      paragraph.className = 'text-danger text-center';
      paragraph.textContent = 'No Reviews Yet';

      this.customersReviewContainer.appendChild(paragraph);

      return;
    }

    customersReview.forEach(cr => {
      const colDiv = document.createElement('div');
      colDiv.className = 'col-3 text-center border rounded shadow-sm p-3 m-3';

      const stars = cr.stars;

      const starsContainer = document.createElement('div');
      starsContainer.className = 'mb-3';

      for (let i = 0; stars > i; i++) {
        const star = document.createElement('i');
        star.className = 'bi bi-star-fill text-warning';

        starsContainer.appendChild(star);
      }

      colDiv.appendChild(starsContainer);

      const name = document.createElement('h6');
      name.className = 'm-0';
      name.innerText = cr.barberName || 'Barber';

      const position = document.createElement('span');
      position.className = 'text-secondary';
      position.innerText = 'Barber';

      const comment = document.createElement('p');
      comment.className = 'mt-5 text-start mb-0';
      comment.innerText = 'Comment';

      const commentContainer = document.createElement('div');
      commentContainer.className = 'border shadow p-3';

      const getDefaultComment = (stars) => {
        switch (stars) {
          case 1:
            return 'Not satisfied with the service. The haircut did not match my request.';
          case 2:
            return 'The haircut was okay but not what I expected.';
          case 3:
            return 'Overall okay experience, but room for improvement.';
          case 4:
            return 'Great haircut and friendly service.';
          case 5:
            return 'Perfect haircut! Exactly what I wanted.';
          default:
            return 'No review provided.';
        }
      }

      const commentContent = document.createElement('span');
      commentContent.className = 'text-secondary';
      commentContent.textContent = cr.comments || getDefaultComment(stars);

      colDiv.appendChild(commentContent);

      commentContainer.appendChild(commentContent);

      colDiv.appendChild(name);
      colDiv.appendChild(position);
      colDiv.appendChild(comment);
      colDiv.appendChild(commentContainer);

      this.customersReviewContainer.appendChild(colDiv);
    })    
  }
}
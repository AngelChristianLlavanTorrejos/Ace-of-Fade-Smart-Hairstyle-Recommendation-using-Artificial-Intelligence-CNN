export class BarberReviewView {
  constructor () {
    this.toReviewContainer = document.querySelector('.js-to-review-container');

    this.customersReviewContainer = document.querySelector('.js-customers-review-container');
  }

  async renderToReview (reviewData) {
    this.toReviewContainer.innerHTML = '';

    if (reviewData.length === 0) {
      this.toReviewContainer.innerText = "Nothing To Review";
      this.toReviewContainer.className = "text-danger text-center";
      return;
    }

    let toReviewHTML = '';

    reviewData.forEach(data => {
      toReviewHTML += `
        <div class="border p-3 mt-3">
          <div class="row align-items-center">
            <div class="col-3">
              <p class="mb-0">${data.barberName}</p>
              <span class="text-secondary mb-0">Barber Name</span>
            </div>

            <div class="col-3">
              <p class="mb-0">${data.haircut || "Not Set"}</p>
              <span class="text-secondary mb-0">Haircut</span>
            </div>

            <div class="col-4">
              <input type="radio" name="rating-${data.id}" id="one" value="1">
              <label for="one">1 <i class="bi bi-star text-warning me-3"></i></label>

              <input type="radio" name="rating-${data.id}" id="two" value="2">
              <label for="two">2 <i class="bi bi-star text-warning me-3"></i></label>

              <input type="radio" name="rating-${data.id}" id="three" value="3">
              <label for="two">3 <i class="bi bi-star text-warning me-3"></i></label>

              <input type="radio" name="rating-${data.id}" id="four" value="4">
              <label for="two">4 <i class="bi bi-star text-warning me-3"></i></label>

              <input type="radio" name="rating-${data.id}" id="five" value="5">
              <label for="two">5 <i class="bi bi-star text-warning me-3"></i></label>

              <div class="mt-3">
                <textarea class="form-control js-comment-${data.id}" placeholder="Comment" style="resize: none;"></textarea>
              </div>
            </div>

            <div class="col-2 text-center">
              <button class="btn btn-success js-review-button" data-appointment-id="${data.id}">Submit Review</button>
            </div>
          </div>
          <div class="js-review-result-${data.id}"></div>
        </div>
      `;
    })

    this.toReviewContainer.innerHTML = toReviewHTML;
  }

  async onReview (reviewData, callback) {
    reviewData.forEach(data => {
      document.querySelectorAll('.js-review-button')
        .forEach(button => {
          button.addEventListener('click', () => {
            const id = button.dataset.appointmentId;

            console.log(id);

            const ratingInput = document.querySelector(`input[name="rating-${data.id}"]:checked`);
            const stars = ratingInput?.value || 0;

            const commentInput = document.querySelector(`.js-comment-${data.id}`);
            const comments = commentInput ? commentInput.value : 0;

            const ratingData = {id, stars, comments};

            const res = document.querySelector(`.js-review-result-${id}`);

            console.log(res);

            if (stars === 0) {
              res.innerText = 'Please Rate The Barber';
              res.className = `text-center text-danger mt-3 js-review-result-${id}`;
              setTimeout(() => {
                res.innerText = '';
              }, 2000)
              return;
            }
            else {
              res.innerText = 'Rate Successful';
              res.className = `text-center text-success mt-3 js-review-result-${id}`;
              setTimeout(() => {
                location.href = "../../../client-pages/barber-review.html";
              }, 2000)
            }

            callback(ratingData)        
          })
        })
    })
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
      commentContainer.className = 'border p-3';

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
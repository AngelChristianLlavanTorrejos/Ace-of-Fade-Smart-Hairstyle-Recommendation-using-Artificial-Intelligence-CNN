export class DashboardView {
  constructor () {
    this.cardContainer = document.querySelector('.js-card-container');
  }

  async renderCards (cards) {
    this.cardContainer.innerHTML = '';

    let cardsHTML = '';

    cards.forEach(card => {
      cardsHTML += `
        <div class="text-center border rounded p-3 text-light ${card.color} w-25 mx-1">
          ${card.icon}
          <p class="fs-1 m-0 mt-3 mb-3">${card.count}</p>
          <span>${card.title}</span>
        </div>
      `
    });

    this.cardContainer.innerHTML = cardsHTML;
  }

  // async renderHaircutTrends (trends) {
  //   this.haircutTrendsContainer.innerHTML = '';

  //   trends.forEach((trend, index) => {
  //     const p = document.createElement('p');
  //     p.innerHTML = `${index + 1}. ${trend.haircut} <i class="bi bi-fire text-danger"></i>`;

  //     this.haircutTrendsContainer.appendChild(p);
  //   })
  // }

  // async renderTopPerformingBarbers (topPerforming) {
  //   this.topPerformingBarberContainer.innerHTML = '';

  //   topPerforming.forEach((item, index) => {
  //     const p = document.createElement('p');
  //     p.innerText = `${index + 1}. ${item.barberName}`;

  //     this.topPerformingBarberContainer.appendChild(p);
  //   })
  // }

  // async renderTopClients (topClients) {
  //   this.topClientsContainer.innerHTML = '';

  //   topClients.forEach((item, index) => {
  //     const p = document.createElement('p');
  //     p.innerText = `${index + 1}. ${item.clientName}`;

  //     this.topClientsContainer.appendChild(p);
  //   })
  // }

  async renderLeaderboards (itemsToRender, container) {
    container.innerHTML = '';

    itemsToRender.forEach((item, index) => {
      const p = document.createElement('p');

      if (item.length === 0) {
        p.innerHTML = `<span class="text-danger">No Records Yet</span>`;
      }
      else {
        if (item.clientName) {
          p.innerHTML = `${index + 1}. ${item.clientName} | <span class="text-success">Completed Appointments: ${item.completedAppointments}</span>`;
        } else if (item.barberName) {
          p.innerHTML = `${index + 1}. ${item.barberName} | <span class="text-success">Completed Appointments: ${item.completedAppointments}</span>`;
        }
        else {
          p.innerHTML = `${index + 1}. ${item.haircut} <i class="bi bi-fire text-danger"></i> | <span class="text-success">Times Chosen: ${item.timesChosen}</span>`;
        }
      }

      container.appendChild(p);
    })
  }
}
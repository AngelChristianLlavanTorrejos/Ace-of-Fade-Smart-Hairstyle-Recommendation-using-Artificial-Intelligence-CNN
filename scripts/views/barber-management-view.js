export class BarberManagementView {
  constructor () {
    this.barbersTableBody = document.querySelector('.js-barbers-table-body');
    this.barber = {
      name: document.querySelector('.js-barber-name')
    };
    this.addBarberButton = document.querySelector('.js-add-barber-button');
    this.createBarberResult = document.querySelector('.js-create-barber-result')
  }

  async renderBarbersTableData (barbers) {
    this.barbersTableBody.innerHTML = '';

    if (barbers.length === 0) {
      this.barbersTableBody.innerHTML = `
        <tr>
          <td class="text-center text-danger" colspan="2">No Barbers Found</td>
        </tr>
      `;
    }

    barbers.forEach(barber => {
      const row = document.createElement('tr');
      row.style = "cursor: pointer";

      const cells = {
        id: this.createCell(barber.id),
        name: this.createCell(barber.name)
      };

      Object.values(cells).forEach(cell => {
        row.appendChild(cell);
      })

      this.barbersTableBody.appendChild(row);

      row.addEventListener('click', () => {
        location.href = `barber-information.html?id=${barber.id}`;
      })
    });
  }

  createCell (value) {
    const cell = document.createElement('td');
    cell.textContent = value;
    return cell;
  }

  async createBarber (callback) {
    this.addBarberButton.addEventListener('click', () => {
      const value = this.barber.name.value;

      const barber = {
        name: this.barber.name.value
      }

      const hasErrors = this.showCreateBarberErrors(value);

      if (hasErrors) {
        return;
      }

      callback (barber);
    })
  }

  showCreateBarberErrors (value) {
    setTimeout(() => {
      this.createBarberResult.innerHTML = '';
    }, 2000)

    console.log(value);

    if (value === '') {
      this.createBarberResult.className = 'text-center text-danger mt-3';
      this.createBarberResult.innerHTML = 'Barber Name Is Required';
      return true;
    }

    if (!/^[A-Za-z\s]+$/.test(value)) {
      this.createBarberResult.className = 'text-center text-danger mt-3';
      this.createBarberResult.innerHTML = 'Enter A Valid Name';
      return true;
    }

    this.createBarberResult.className = 'text-center text-success mt-3';
    this.createBarberResult.innerHTML = 'Add Barber Successful';

    return false;
  }
}
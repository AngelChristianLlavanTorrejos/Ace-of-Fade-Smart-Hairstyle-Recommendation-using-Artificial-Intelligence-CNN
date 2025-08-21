export class AppointmentView {
  constructor () {
    this.appointmentStatusData = ['All', 'Approved', 'Rejected', 'Pending', 'Notice For Reschedule', 'Cancelled', 'Completed'];

    this.appointmentStatusContainer = document.querySelector('.js-appointment-status');

    this.appointmentTable = document.querySelector('.js-appointment-table');

    this.tableHeadData = ['ID', 'Client Name', 'Barber Name', 'Status', 'Date', 'Time In', 'Time Out', 'Message', 'Haircut', 'Action'];

    this.modalBody = document.querySelector('.js-modal-body')
  }

  async renderAppointmentStatus (callback) {
    this.appointmentStatusContainer.innerHTML = '';

    const ul = document.createElement('ul');
    ul.className = "list-unstyled d-flex gap-3 mt-3 mb-0"

    this.appointmentStatusData.forEach(item => {
      const li = document.createElement('li');
      li.className = 'css-status-list'

      li.innerText = item;
      li.addEventListener('click', () => {
        ul.querySelectorAll('li').forEach(li => {
          li.style.color = 'rgb(13, 110, 253)';
        })
        li.style.color = 'rgb(25, 135, 84)';

        callback(item);
      })
      ul.appendChild(li);
    })

    this.appointmentStatusContainer.appendChild(ul);
  }

  async renderAppointmentTable (appointments) {
    this.appointmentTable.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'table table-bordered table-sm text-center mt-3';

    // Table Head
    const thead = document.createElement('thead');
    thead.className = 'text-light css-appointment-table-head';

    const headRow = document.createElement('tr');

    this.tableHeadData.forEach(item => {
      const header = document.createElement('th');
      header.innerText = item;

      headRow.appendChild(header);
    })

    thead.appendChild(headRow);

    // Table Body
    const tbody = document.createElement('tbody');

    if (appointments.length > 0) {
      const createCell = (value) => {
        const cell = document.createElement('td');
        cell.innerText = value;

        if (value === 'Pending') {
          cell.className = 'text-warning';
        }
        else if (value === 'Approved' || value === 'Completed') {
          cell.className = 'text-success';
        }
        else if (value === 'Cancelled' || value === 'Rejected' || value === 'Notice For Reschedule') {
          cell.className = 'text-danger';
        }
        else {
          cell.className = 'text-dark';
        }

        return cell;
      }

      const createButton = (appointment) => {
        const button = document.createElement('button');
        button.textContent = 'Choose an action';
        button.className = 'btn btn-primary btn-sm';
        button.type = 'button';
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', `#appointment-id-${appointment.id}`);

        if (appointment.status !== 'Pending' && appointment.status !== 'Approved') {
          button.disabled = true;
        }

        const cell = document.createElement('td');
        cell.appendChild(button);
        return cell;
      }

      appointments.forEach(appointment => {
        const bodyRow = document.createElement('tr');

        const cell = {
          id: createCell(appointment.id),
          clientName: createCell(appointment.clientName),
          barberName: createCell(appointment.barberName),
          status: createCell(appointment.status),
          date: createCell(appointment.date),
          timeIn: createCell(appointment.timeIn),
          timeOut: createCell(appointment.timeOut),
          message: createCell(appointment.message ?? "Not Set"),
          haircut: createCell(appointment.haircut ?? "Not Set"),
          action: createButton(appointment)
        };

        Object.values(cell).forEach(cell => {
          bodyRow.appendChild(cell);
        })

        tbody.appendChild(bodyRow);
      })
    }
    else {
      const bodyRow = document.createElement('tr');
      const cell = document.createElement('td');
      cell.className = 'text-danger text-center';
      cell.colSpan = 10;
      cell.innerText = 'No Records Found';

      bodyRow.appendChild(cell);
      tbody.appendChild(bodyRow);
    }

    table.appendChild(thead);
    table.appendChild(tbody);
    this.appointmentTable.appendChild(table);
  }

  async renderModal (appointments) {
    let modalHTML = '';

    appointments.forEach(appointment => {
      modalHTML += `
        <div class="modal fade" id="appointment-id-${appointment.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title" id="exampleModalLabel">Choose An Action</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <form class="js-update-form-${appointment.id}">
                  <label for="status-${appointment.id}" class="form-label">Select Status</label>
                  <select class="form-select" id="status-${appointment.id}" name="status">
                    <option value="1">Approved</option>
                    <option value="2">Rejected</option>
                    <option value="3">Pending</option>
                    <option value="4">Notice For Reschedule</option>
                    <option value="5">Cancelled</option>
                    <option value="6">Completed</option>
                  </select>
                </form>
              </div>
              <div class="js-update-appointment-result-${appointment.id}"></div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                <button type="button" class="js-update-appointment-button btn btn-success" data-appointment-id="${appointment.id}" data-appointment-client="${appointment.clientId}" data-appointment-barber="${appointment.barberId}">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      `
    })

    this.modalBody.innerHTML = modalHTML;
  }

  async updateAppointmentStatus (callback) {
    const updateAppointmentButton = document.querySelectorAll('.js-update-appointment-button');
    
    updateAppointmentButton.forEach(button => {
      button.addEventListener('click', () => {
        const appointmentId = button.dataset.appointmentId;
        const clientId = button.dataset.appointmentClient;
        const barberId = button.dataset.appointmentBarber;

        const updateForm = document.querySelector(`.js-update-form-${appointmentId}`)
        
        const formData = new FormData(updateForm);
        const newStatusId = formData.get('status');

        const updatedStatus = {
          statusId: newStatusId
        };

        const reviewData = {
          clientId,
          barberId
        }

        callback(appointmentId, updatedStatus, reviewData);
      })
    })
  }

  async showResult (id, data) {
    const result = document.querySelector(`.js-update-appointment-result-${id}`);

    if (data.message) {
      result.className = 'text-success text-center m-1';
      result.innerText = data.message;
    }
    else {
      result.className = 'text-success text-center m-1';
      result.innerText = 'Something Went Wrong'
    }

    setTimeout(() => {
      result.innerText = ''
    }, 2000)
  }
}
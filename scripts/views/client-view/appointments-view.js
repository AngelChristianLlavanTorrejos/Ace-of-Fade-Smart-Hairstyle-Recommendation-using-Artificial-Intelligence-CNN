export class AppointmentsView {
  constructor () {
    this.appointmentFormFields = document.querySelector('.js-appointment-form-fields');

    this.formFieldsData = {
      'Date': 'date',
      'Barber Name': 'barber-name',
      'Time In': 'time-in',
      'Time Out': 'time-out',
      'Haircut': 'haircut',
      'Message': 'message'
    };

    this.appointmentForm = document.querySelector('.js-appointment-form');

    this.appointmentSummary = document.querySelector('.js-appointment-summmary');

    this.appointmentSummaryLabels = ['Date', 'Barber', 'Time In', 'Time Out', 'Haircut', 'Message'];

    this.confirmAppointmentButton = document.querySelector('.js-confirm-appointment-button');

    this.appointmentErrorContainer = document.querySelector('.js-errors');

    this.appointmentHistory = document.querySelector('.js-appointment-history');
  }

  async renderAppointmentForm (barbers) {
    this.appointmentFormFields.innerHTML = '';

    Object.keys(this.formFieldsData).forEach(key => {
      const div = document.createElement('div');
      div.className = 'mb-3';

      const createLabel = () => {
        const label = document.createElement('label')
        label.for = this.formFieldsData[key];
        label.textContent = key;
        div.appendChild(label);
      }

      const createInput = (type) => {
        const input = document.createElement('input');
        input.className = 'form-control';
        input.name = this.formFieldsData[key];
        input.type = type;
        input.placeholder = 'Optional';
        div.appendChild(input);
      }

      if (key === 'Date') {
        createLabel()
        createInput('date');
      }
      else if (key === 'Time In' || key === 'Time Out') {
        createLabel()
        createInput('time');
      }
      else if (key === 'Barber Name') {
        const select = document.createElement('select');
        select.className = 'form-control';
        select.name = this.formFieldsData[key];
        barbers.forEach(barber => {
          const option = document.createElement('option');
          option.value = barber.id;
          option.innerText = barber.name;
          select.appendChild(option);
        })
        createLabel()

        div.appendChild(select);
      }
      else {
        createLabel();
        createInput('text');
      }

      this.appointmentFormFields.appendChild(div);
    })
  }

  async createAppointment (callback) {
    this.appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const appointmentFormData = new FormData(this.appointmentForm);

      const appointment = {
        barberId: appointmentFormData.get('barber-name'),
        date: appointmentFormData.get('date'),
        timeIn: appointmentFormData.get('time-in'),
        timeOut: appointmentFormData.get('time-out'),
        haircut: appointmentFormData.get('haircut'),
        message: appointmentFormData.get('message')
      }

      callback(appointment);
    })
  }

  async renderAppointmentSummary(appointment, barbers) {
    this.appointmentSummary.innerHTML = '';

    const id = appointment.barberName;
    const barber = barbers.find(barber => barber.id == id);
    const name = barber ? barber.name : 'Default Barber';

    Object.values(appointment).forEach((value, index) => {
      const paragraph = document.createElement('p');
      paragraph.innerHTML = `
        <p>${this.appointmentSummaryLabels[index]}: 
          <span class="ms-1 ${value ? 'text-success' : 'text-danger'}">
            ${value ? (value == id ? name : value) : 'Not Set'}
          </span>
        </p>`;
      this.appointmentSummary.appendChild(paragraph);
    });
  }

  //Client-side validation
  async validateRequiredFields (appointment) {
    const keyToValidate = ['date', 'timeIn', 'timeOut'];
    const clientSideValidationErrors = [];

    Object.keys(appointment).forEach(key => {
      if (keyToValidate.includes(key) && appointment[key] === '') {
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1') 
          .replace(/^./, char => char.toUpperCase());

        clientSideValidationErrors.push(`${formattedKey} Is Required`);
      }
    })

    return clientSideValidationErrors;
  }

  async confirmAppointment (callback) {
    this.confirmAppointmentButton.addEventListener('click', async () => {
      callback();
    })
  }

  async renderAppointmentErrors(errors) {
    this.appointmentErrorContainer.innerHTML = '';

    errors.forEach(error => {
        const p = document.createElement('p');
        p.textContent = error;
        p.className = `text-center m-0 ${error === 'Appointment Booking Successful' ? 'text-light' : 'text-light'} shadow-sm p-1 rounded mb-1`;
        p.style = `${error === 'Appointment Booking Successful' ? "background-color: rgba(40, 167, 69, 0.8)" : "background-color: rgba(220, 53, 69, 0.8)"}`
        this.appointmentErrorContainer.appendChild(p);
    });

    setTimeout(() => {
        this.appointmentErrorContainer.innerHTML = '';
    }, 2000);
  }

  createCell(value) {
    const cell = document.createElement('td');
    cell.classList.add('align-middle');

    switch (value) {
        case 'Pending':
            cell.classList.add('text-warning');
            break;
        case 'Approved':
        case 'Completed':
            cell.classList.add('text-success');
            break;
        case 'Rejected':
        case 'Notice For Reschedule':
        case 'Cancelled':
            cell.classList.add('text-danger');
            break;
        default:
            cell.classList.add('text-dark'); // default color
    }

    cell.innerText = value;
    return cell;
  }

  async renderAppointmentHistory (appointments) {
    this.appointmentHistory.innerHTML = '';

    if (appointments.length === 0) {
      this.appointmentHistory.innerHTML = '<tr><td class="text-danger text-center" colspan="6">No Appointments Found</td></tr>';
    }

    appointments.forEach(appointment => {
      const row = document.createElement('tr');

      const actionCell = document.createElement('td');

      const button = document.createElement('button');
      button.className = "btn btn-danger btn-sm";
      button.innerText = "Cancel";
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#cancelAppointment');
      button.setAttribute('data-id', appointment.appointmentId);

      if (appointment.status !== 'Pending' && appointment.status !== 'Approved') {
        button.disabled = true;
      }

      button.addEventListener('click', (e) => {
        const appointmentId = e.target.getAttribute('data-id');
        
        const modalTitle = document.querySelector('#cancelAppointment .modal-title');
        const modalBody = document.querySelector('#cancelAppointment .modal-body');

        modalTitle.innerText = `Cancel Appointment #${appointmentId}`;
        modalBody.innerHTML = `
          <span class="text-dark">Are you sure you want to cancel your appointment?</span>
          <span class="text-danger"> Appointment Id ${appointmentId}?</span>
          <span class="text-dark">This cannot be undone.</span>
        `;

        if (this.onCancelAppointmentClick) {
          this.onCancelAppointmentClick(appointmentId);
        }
      });

      actionCell.appendChild(button)

      const cells = {
        appointmentId: this.createCell(appointment.appointmentId),
        barberName: this.createCell(appointment.barberName),
        date: this.createCell(appointment.date),
        timeIn: this.createCell(appointment.timeIn),
        timeOut: this.createCell(appointment.timeOut),
        status: this.createCell(appointment.status),
        action: actionCell
      };

      Object.values(cells).forEach(cell => {
        row.appendChild(cell);
      })

      this.appointmentHistory.appendChild(row);
    })
  }

}
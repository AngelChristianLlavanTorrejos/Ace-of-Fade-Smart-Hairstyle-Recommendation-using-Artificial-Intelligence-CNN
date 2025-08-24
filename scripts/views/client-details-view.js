export class ClientDetailsView {
  constructor () {
    this.personalInformationContainer = document.querySelector('.js-personal-information');
    this.appointmentHistory = document.querySelector('.js-appointment-history');
    this.personalInformationTab = document.querySelector('.js-appointment-history-tab');
    this.appointmentHistoryTab = document.querySelector('.js-appointment-history-tab');
  }

  formatDate = (value) => {
    const date = new Date(value);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  async renderPersonalInformation (client) {
    this.personalInformationContainer.innerHTML = '';

    if (!client) return;

    const name = client.middleName ? `${client.firstName} ${client.middleName} ${client.lastName}` : `${client.firstName} ${client.lastName}`

    this.personalInformationContainer.innerHTML = `
      <h5 class="m-0">${name}</h5>
      <p class="text-secondary m-0">Registered on ${this.formatDate(client.registrationDate)}</p>

      <div class="mt-3">

        <div class="d-flex align-items-center gap-3">
          <div class="w-auto">
            <i class="bi bi-person-badge fs-3"></i> 
          </div>
          <div class="w-auto">
            <p class="m-0">${client.userId || 'Not Provided'}</p>
            <p class="text-secondary m-0">Client ID</p>
          </div>
        </div>

        <div class="d-flex align-items-center gap-3 mt-3">
          <div class="w-auto">
            <i class="bi bi-gender-male fs-3"></i>
          </div>
          <div class="w-auto">
            <p class="m-0">${client.gender || 'Not Provided'}</p>
            <p class="text-secondary m-0">Gender</p>
          </div>
        </div>

        <div class="d-flex align-items-center gap-3 mt-3">
          <div class="w-auto">
            <i class="bi bi-envelope fs-3"></i>
          </div>
          <div class="w-auto">
            <p class="m-0">${client.email || 'Not Provided'}</p>
            <p class="text-secondary m-0">Email</p>
          </div>
        </div>

        <div class="d-flex align-items-center gap-3 mt-3">
          <div class="w-auto">
            <i class="bi bi-telephone fs-3"></i>         
          </div>
          <div class="w-auto">
            <p class="m-0">${client.contactNumber || 'Not Provided'}</p>
            <p class="text-secondary m-0">Email</p>
          </div>
        </div>

        <div class="d-flex align-items-center gap-3 mt-3">
          <div class="w-auto">
            <i class="bi bi-geo fs-3"></i>         
          </div>
          <div class="w-auto">
            <p class="m-0">${client.address || 'Not Provided'}</p>
            <p class="text-secondary m-0">Address</p>
          </div>
        </div>
      </div>
    `
  }

  async renderAppointmentHistory(appointment) {
    this.appointmentHistory.innerHTML = '';

    if (appointment.length === 0) {
      this.appointmentHistory.innerHTML = `
        <div class="border rounded shadow-sm p-3 mt-3">
          <p class="text-center text-danger">No Records Found</p>
        </div>
      `
      return;
    }

    let appointmentHTML = '';
    appointment.forEach(appointment => {

      let color = '';

      switch (appointment.status) {
        case 'Completed':
        case 'Approved':
          color = 'bg-success';
          break;
        case 'Pending':
          color = 'bg-warning'
          break;
        case 'Notice For Reschedule':
        case 'Rejected':
        case 'Cancelled':
          color = 'bg-danger'
          break;
        default:
          color = 'bg-light'
          break;
      }

      appointmentHTML += `
        <div class="border rounded shadow-sm p-3 mt-3">
          <div class="d-flex align-items-center gap-3 mb-3">
            <h5 class="m-0">Appointment #${appointment.appointmentId}</h5>
            <span class="text-light ${color} px-2 py-1 rounded">${appointment.status}</span>
          </div>

          <div class="d-flex align-items-center gap-3">
            <div class="w-auto">
              <i class="bi bi-calendar-event fs-3"></i>
            </div>
            <div class="w-auto">
              <p class="m-0">${this.formatDate(appointment.date)}</p>
              <p class="text-secondary m-0">Appointment Date</p>
            </div>
          </div>

          <div class="d-flex align-items-center gap-3 mt-3">
            <div class="w-auto">
              <i class="bi bi-clock fs-3"></i>
            </div>
            <div class="w-auto">
              <p class="m-0">${appointment.timeIn} - ${appointment.timeOut}</p>
              <p class="text-secondary m-0">Time Frame</p>
            </div>
          </div>

          <div class="d-flex align-items-center gap-3 mt-3">
            <div class="w-auto">
              <i class="bi bi-scissors fs-3"></i>
            </div>
            <div class="w-auto">
              <p class="m-0">${appointment.barberName}</p>
              <p class="text-secondary m-0">Barber Name</p>
            </div>
          </div>

          <div class="d-flex align-items-center gap-3 mt-3">
            <div class="w-auto">
              <i class="bi bi-list-ol fs-3"></i>
            </div>
            <div class="w-auto">
              <p class="m-0">${appointment.appointmentId}</p>
              <p class="text-secondary m-0">Reference No.</p>
            </div>
          </div>
        </div>
      `
    })

    this.appointmentHistory.innerHTML = appointmentHTML;
  }

  async hideContent() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('.js-personal-information-tab')) {
        this.personalInformationContainer.style.display = "block";
        this.appointmentHistory.style.display = "none";
      }

      if (e.target.matches('.js-appointment-history-tab')) {
        this.personalInformationContainer.style.display = "none";
        this.appointmentHistory.style.display = "block";
      }
    });
  }
}
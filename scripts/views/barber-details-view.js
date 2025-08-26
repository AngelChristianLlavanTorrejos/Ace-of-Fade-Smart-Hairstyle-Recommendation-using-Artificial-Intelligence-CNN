export class BarberDetailsView {
  constructor () {
    this.personalInfo = document.querySelector('.js-personal-information');
    this.appointmentHistory = document.querySelector('.js-appointment-history');
  }

  async renderPersonalInfo (barber) {
    this.personalInfo.innerHTML = '';

    if (!barber) return;

    this.personalInfo.innerHTML = `
      <h5 class="m-0">${barber.name}</h5>
    `
  }

  formatDate = (value) => {
    const date = new Date(value);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
  }

  async renderAppointmentHistory (appointments) {
    this.appointmentHistory.innerHTML = '';

    if (appointments.length === 0) {
      this.appointmentHistory.innerHTML = `
        <p class="m-0 text-center text-danger">No Appointments Found</p>
      `
      return;
    }

    let appointmentHTML = '';
    
    appointments.forEach(appointment => {

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
        <div class="border rounded p-3 mb-3">
          <div class="d-flex align-items-center g-3 mb-3">
            <h5 class="d-flex m-0 me-3">Appointment #${appointment.id}</h5>
            <hp class="d-flex m-0 ${color} py-1 px-2 rounded text-light">${appointment.status}</hp>
          </div>

          <div class="row">
            <div class="col-6">
              <div class="d-flex align-items-center g-3">
                <div class="w-auto">
                  <i class="bi bi-person-circle fs-3"></i>
                </div>
                <div class="w-auto ms-3">
                  <p class="m-0">${appointment.clientName}</p>
                  <p class="text-secondary m-0">Client Name</p>
                </div>
              </div>

              <div class="d-flex align-items-center g-3 mt-3">
                <div class="w-auto">
                  <i class="bi bi-calendar-event fs-3"></i>
                </div>
                <div class="w-auto ms-3">
                  <p class="m-0">${this.formatDate(appointment.date)}</p>
                  <p class="text-secondary m-0">Appointment Date</p>
                </div>
              </div>

              <div class="d-flex align-items-center g-3 mt-3">
                <div class="w-auto">
                  <i class="bi bi-clock fs-3"></i>
                </div>
                <div class="w-auto ms-3">
                  <p class="m-0">${appointment.timeIn} - ${appointment.timeOut}</p>
                  <p class="text-secondary m-0">Time Frame</p>
                </div>
              </div>
            </div>

            <div class="col-6">
              <div class="d-flex align-items-center g-3 mt-3">
                <div class="w-auto">
                  <i class="bi bi-scissors fs-3"></i>
                </div>
                <div class="w-auto ms-3">
                  <p class="m-0">${appointment.haircut || "Not Provided"}</p>
                  <p class="text-secondary m-0">Haircut</p>
                </div>
              </div>

              <div class="d-flex align-items-center g-3 mt-3">
                <div class="w-auto">
                  <i class="bi bi-envelope fs-3"></i>
                </div>
                <div class="w-auto ms-3">
                  <p class="m-0">${appointment.message || "Nothing"}</p>
                  <p class="text-secondary m-0">Note</p>
                </div>
              </div>

              <div class="d-flex align-items-center g-3 mt-3">
                <div class="w-auto">
                  <i class="bi bi-calendar-plus fs-3"></i>
                </div>
                <div class="w-auto ms-3">
                  <p class="m-0">${appointment.createdAt}</p>
                  <p class="text-secondary m-0">Created At</p>
                </div>
              </div>
            </div>          
          </div>
        </div>
      `
    })

    this.appointmentHistory.innerHTML = appointmentHTML;
  }
}
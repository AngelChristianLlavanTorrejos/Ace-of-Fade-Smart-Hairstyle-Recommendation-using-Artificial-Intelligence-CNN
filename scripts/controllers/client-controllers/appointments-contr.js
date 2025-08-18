export class AppointmentsContr {
  constructor(model, view, id) {
    this.model = model;
    this.view = view;
    this.id = id;
  }

  async init() {
    const barbers = await this.model.fetchBarbers();
    await this.view.renderAppointmentForm(barbers);

    let currentAppointmentData = null;
    let errors = [];

    await this.view.createAppointment( async (appointmentData) => {  
      console.log(appointmentData.date);

      currentAppointmentData = appointmentData; 

      await this.view.renderAppointmentSummary(appointmentData, barbers);

      errors = await this.view.validateRequiredFields(appointmentData);
    });

    await this.view.confirmAppointment(async () => {
      if (errors.length > 0) {
        await this.view.renderAppointmentErrors(errors);
        return;
      }

      const serverSideValidationResult = await this.model.createAppointment(this.id, currentAppointmentData);
      
      errors.push(serverSideValidationResult.validationMessage);

      await this.view.renderAppointmentErrors(errors);

      console.log(currentAppointmentData);
    })

    const appointmentHistory = await this.model.fetchAppointmentsById(this.id);
    await this.view.renderAppointmentHistory(appointmentHistory)

    this.view.onCancelAppointmentClick = (appointmentId) => {
      const confirmButton = document.querySelector('#cancelAppointment .js-confirm-cancel-button');
      confirmButton.onclick = null;

      confirmButton.onclick = async () => {
        const result = await this.model.cancelAppointment(appointmentId);

        if (result) {
          console.log('Cancellation Successful');
        } else {
          console.log('Something went wrong');
        }

        const modal = bootstrap.Modal.getInstance(document.getElementById('cancelAppointment'));
        modal.hide();

        const updatedAppointments = await this.model.fetchAppointmentsById(this.id);
        await this.view.renderAppointmentHistory(updatedAppointments);
      };
    };

  }
}
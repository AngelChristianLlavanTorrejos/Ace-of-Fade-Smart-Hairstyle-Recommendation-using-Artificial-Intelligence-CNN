export class AppointmentContr {
  constructor (model, view) {
    this.model = model;
    this.view = view;
  }

  async init () { 
    const appointmentData = await this.model.getAppointmentByStatus();
    await this.view.renderAppointmentTable(appointmentData);
    await this.view.renderModal(appointmentData);

    await this.view.renderAppointmentStatus(async (status) => {
      const updatedAppointmentData = await this.model.getAppointmentByStatus(status);
      await this.view.renderAppointmentTable(updatedAppointmentData);
      await this.view.renderModal(appointmentData);
      console.log(status);
      console.log(updatedAppointmentData);
    })

    await this.view.updateAppointmentStatus( async (appointmentId, updatedStatus) => {
      const result = await this.model.updateAppointmentStatus (appointmentId, updatedStatus)

      await this.view.showResult (appointmentId, result);
      
      if (result.message) {
        setTimeout(() => {
          location.reload();
        }, 2000)
      }
    });
  }
}
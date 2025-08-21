export class AppointmentContr {
  constructor (model, view) {
    this.model = model;
    this.view = view;
  }

  async init () { 
    const appointmentData = await this.model.getAppointmentByStatus();
    await this.view.renderAppointmentTable(appointmentData);
    await this.view.renderModal(appointmentData);

    console.log(appointmentData);

    await this.view.renderAppointmentStatus(async (status) => {
      const updatedAppointmentData = await this.model.getAppointmentByStatus(status);
      await this.view.renderAppointmentTable(updatedAppointmentData);
      await this.view.renderModal(appointmentData);
      console.log(status);
      console.log(updatedAppointmentData);
    })

    await this.view.updateAppointmentStatus( async (appointmentId, updatedStatus, reviewData) => {
      const result = await this.model.updateAppointmentStatus (appointmentId, updatedStatus)

      if (updatedStatus.statusId == '6') {
        const isCreated = await this.model.createBarberReview(reviewData);
        console.log(isCreated);
        console.log('Barber To Be Review Created')
      }
      else {
        console.log('Status Id Is Not 6')
      }

      await this.view.showResult (appointmentId, result);
      
      if (result.message) {
        setTimeout(() => {
          location.reload();
        }, 2000)
      }
    });
  }
}
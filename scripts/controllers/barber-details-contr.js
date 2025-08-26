export class BarberDetailsContr {
  constructor (model, view, id) {
    this.model = model;
    this.view = view;
    this.id = id;
  }

  async init () {
    const barber = await this.model.fetchBarberDetails(this.id);
    await this.view.renderPersonalInfo(barber);

    const appointments = await this.model.fetchBarberAppointments(this.id);
    await this.view.renderAppointmentHistory (appointments);
  }
}
export class ClientDetailsContr {
  constructor (model, view, clientId) {
    this.model = model;
    this.view = view;
    this.clientId = clientId;
  }

  async init () {
    const client = await this.model.fetchClientDetails(this.clientId);
    await this.view.renderPersonalInformation(client);

    const clientAppointmentHistory = await this.model.fetchClientAppointmentHistory(this.clientId);
    await this.view.renderAppointmentHistory(clientAppointmentHistory);

    await this.view.hideContent();
  }
}
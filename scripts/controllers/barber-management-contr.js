export class BarberManagementContr {
  constructor (model, view) {
    this.model = model;
    this.view = view;
  }

  async init () {
    const barbers = await this.model.fetchBarbers();
    await this.view.renderBarbersTableData(barbers);

    await this.view.createBarber(async (barber) => {
      await this.model.createBarber(barber);
    })
  }
}
export class DashboardContr {
  constructor (model, view) {
    this.model = model;
    this.view = view;

    this.haircutTrendsContainer = document.querySelector('.js-haircut-trend-container');
    this.topPerformingBarberContainer = document.querySelector('.top-performing-barbers-container');
    this.topClientsContainer = document.querySelector('.top-regular-clients-container');
  }

  async init () {
    const appointmentsToday = await this.model.fetchAppointmentsToday();
    const pendingAppointments = await this.model.fetchPendingAppointments();
    const totalClients = await this.model.fetchTotalClients();
    const totalBarbers = await this.model.fetchTotalBarbers();

    const cardData = [
      {
        icon: '<i class="bi bi-calendar-event fs-3"></i>',
        count: appointmentsToday || 0,
        title: 'Appointments Today',
        color: 'bg-danger'
      },
      {
        icon: '<i class="bi bi-calendar-event-fill fs-3"></i>',
        count: pendingAppointments || 0,
        title: 'Pending Appointments',
        color: 'bg-success'
      },
      {
        icon: '<i class="bi bi-people card-icon fs-3"></i>',
        count: totalClients || 0,
        title: 'Total Clients',
        color: 'bg-primary'
      },
      {
        icon: '<i class="bi bi-scissors card-icon fs-3"></i>',
        count: totalBarbers || 0,
        title: 'Total Barbers',
        color: 'bg-warning'
      }
    ]

    await this.view.renderCards(cardData);

    const topHaircut = await this.model.fetchTopHaircut();
    const topPerformingBarbers = await this.model.fetchTopPerformingBarbers();
    const topClients = await this.model.fetchTopClients();

    await this.view.renderLeaderboards(topHaircut, this.haircutTrendsContainer);
    await this.view.renderLeaderboards(topPerformingBarbers, this.topPerformingBarberContainer);
    await this.view.renderLeaderboards(topClients, this.topClientsContainer);
  }
}
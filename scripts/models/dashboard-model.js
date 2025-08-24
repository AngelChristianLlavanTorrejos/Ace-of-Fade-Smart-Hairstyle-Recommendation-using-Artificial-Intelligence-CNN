export class DashboarModel {
  constructor () {
    this.appointmentBaseUrl = 'https://localhost:7109/api/Appointment';
    this.userBaseUrl = 'https://localhost:7109/api/User';
    this.barberBaseUrl = 'https://localhost:7109/api/Barber';
  }

  // Card Data
  async fetchAppointmentsToday () {
    return await this.#fetchCardData(this.appointmentBaseUrl, 'GetAppointmentsCountToday');
  }

  async fetchPendingAppointments () {
    return await this.#fetchCardData(this.appointmentBaseUrl, 'GetPendingAppointmentsCount');
  }

  async fetchTotalClients () {
    return await this.#fetchCardData(this.userBaseUrl, 'GetClientsCount');
  }

  async fetchTotalBarbers () {
    return await this.#fetchCardData(this.barberBaseUrl, 'GetBarbersCount');
  }

  async #fetchCardData (baseUrl, endpoint) {
    try {
      const res = await fetch(`${baseUrl}/${endpoint}`);
      if (!res.ok) return 0;
      return await res.json();
    }
    catch (error) {
      return 0;
    }
  }

  // Leaderboard Data
  async fetchTopPerformingBarbers () {
    return await this.#fetchLeaderboardData(this.barberBaseUrl, 'GetTopPerformingBarbers');
  }

  async fetchTopClients () {
    return await this.#fetchLeaderboardData(this.userBaseUrl, 'GetTopClients');
  }

  async fetchTopHaircut () {
    return await this.#fetchLeaderboardData(this.appointmentBaseUrl, 'GetTopHaircut');
  }

  async #fetchLeaderboardData (baseUrl, endpoint) {
    try {
      const res = await fetch(`${baseUrl}/${endpoint}`);
      if (!res.ok) return [];
      return await res.json();
    }
    catch (error) {
      return [];
    }
  }
}
export class ClientDetailsModel {
  async fetchClientDetails (id) {
    try {
      const res = await fetch(`https://localhost:7109/api/User/GetUserById/${id}`);
      if (!res.ok) return {};
      return await res.json();
    } catch (error) {
      return {};
    }
  }

  async fetchClientAppointmentHistory (id) {
    try {
      const res = await fetch(`https://localhost:7109/api/Appointment/FetchClientAppointment/${id}`);
      if (!res.ok) return [];
      return await res.json();
    } catch (error) {
      return [];
    }
  }
}
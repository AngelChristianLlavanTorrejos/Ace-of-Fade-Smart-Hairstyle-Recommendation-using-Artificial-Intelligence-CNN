export class BarberDetailsModel {
  async fetchBarberDetails (id) {
    try {
      const res = await fetch(`https://localhost:7109/api/Barber/GetBarberById/${id}`);
      if (!res.ok) return {};
      return await res.json();
    } catch (error) {
      return {};
    }
  }

  async fetchBarberAppointments (id) {
    try {
      const res = await fetch(`https://localhost:7109/api/Appointment/FetchBarberAppointmentsById/${id}`);
      if (!res.ok) return [];
      return await res.json();
    } catch (error) {
      return [];
    }
  }
}
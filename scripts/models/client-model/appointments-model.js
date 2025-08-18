export class AppointmentsModel {
  async fetchBarbers () {
    try {
      const res = await fetch('https://localhost:7109/api/Barber/GetBarbers');
      
      if (!res.ok) throw new Error(`Response Status: ${res.status}`)

      const barbers = await res.json();

      return barbers;
    } 
    catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  async createAppointment (id, appointment) {
    try {
      const res = await fetch(`https://localhost:7109/api/Appointment/CreateAppointment/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointment)
      });

      console.log(JSON.stringify(appointment))

      if (!res.ok) {
        return await res.json();
      }

      return await res.json();
    }
    catch (error) {
      console.log(error);
    }
  }

  async fetchAppointmentsById (id) {
    try {
      const res = await fetch(`https://localhost:7109/api/Appointment/FetchClientAppointment/${id}`);

      if (!res.ok) throw new Error(`Response Status: ${res.status}`); 

      const appointments = await res.json();

      return appointments;
    }
    catch (error) {
      console.error(error);
    }
  }

  async cancelAppointment (appointmentId) {
    try {
      const res = await fetch(`https://localhost:7109/api/Appointment/CancelAppointment/${appointmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) return false;

      return true;
    }
    catch (error) {
      console.error(error);
    }
  }
}
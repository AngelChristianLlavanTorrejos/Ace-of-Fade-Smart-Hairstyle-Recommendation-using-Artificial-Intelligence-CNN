export class AppointmentModel {
  async getAppointmentByStatus (status = '') {
    try {
      const res = await fetch(`https://localhost:7109/api/Appointment/GetAppointmentsByStatus?status=${status}`);

      console.log(`Fetched Status: ${status}`);

      if (!res.ok) {
        return [];
      }

      const data = await res.json();

      return data;
    } catch (error) {
      return [];
    }
  }

  async updateAppointmentStatus (statusId, updatedStatus) {
    try {
      const res = await fetch(`https://localhost:7109/api/Appointment/UpdateAppointmentStatus/${statusId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedStatus)
      })

      if (!res.ok) {
        console.log('Appointment Status Is Not Updated');
        console.log(`Response Status: ${res.status}`)
        return;
      }

      const data = await res.json();
      return data;
    } catch (error) {
        console.log('Appointment Status Is Not Updated');
        console.log(`Catched Error: ${error}`)
    }
  }

  async createBarberReview (reviewData) {
    try {
      const res = await fetch('https://localhost:7109/api/BarberReview/CreateBarberReview', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(reviewData)
      })

      if (!res.ok) {
        console.error(`${res.status}`)
        return false;
      }

      return true;
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}
export class BarberManagementModel {
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

  async createBarber (barber) {
    try {
      const res = await fetch('https://localhost:7109/api/Barber/CreateBarber', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(barber)
      })

      if (!res.ok) throw new Error(`Response Status: ${res.status}`);

      const message = await res.json();

      return message;
    }
    catch (error) {
      console.error(`Error: ${error.message}`)
    }
  }
}
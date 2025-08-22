export const accountManagementModel = {
  async updateProfileInformation (id, data) {
    try {
      const res = await fetch(`https://localhost:7109/api/User/UpdatePersonalInformation/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) return { errorMessage: 'Update Unsuccessful'};

      return await res.json();
    }
    catch (error) {
      return { errorMessage: error.message };
    }
  },

  async fetchPersonalInformation (id) {
    try {
      const res = await fetch(`https://localhost:7109/api/User/GetUserById/${id}`);

      if (!res.ok) return { errorMessage: 'Something went wrong' };

      const data = await res.json();

      return data;
    }
    catch (error) {
      return { errorMessage: error.message };
    }
  },

  async changePassword (id, data) {
    try {
      const res = await fetch(`https://localhost:7109/api/User/ChangePassword/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        return false;
      }

      return true;
    }
    catch (error) {
      console.log(error);
    }
  }
}
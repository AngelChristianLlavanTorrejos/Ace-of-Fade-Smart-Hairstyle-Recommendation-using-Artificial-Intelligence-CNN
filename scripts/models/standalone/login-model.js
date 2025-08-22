export class LoginModel {
  async authenticateUser (credential) {
    const res = await fetch('https://localhost:7109/api/Authentication/IsAuthenticated', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credential)
    })

    if (!res.ok) {
      const errorData = await res.json();

      if (errorData.errors) {
        const errors = [];

        for (const key in errorData.errors) {
          errors.push({
            key: key,
            messages: errorData.errors[key]
          })
        }

        return errors;
      }

      return res.status;
    }

    const authenticatedUser = await res.json();

    if (authenticatedUser.role === 'Client') {
      localStorage.setItem('client-session', JSON.stringify(authenticatedUser));
    }

    else {
      localStorage.setItem('admin-session', JSON.stringify(authenticatedUser));
    }

    return authenticatedUser;
  }
}
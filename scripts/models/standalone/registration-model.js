export class RegistrationModel {
  async createUser (newUser) {
    const res = await fetch('https://localhost:7109/api/User/CreateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });

    if (!res.ok) {
      const errorData = await res.json();

      const errors = [];

      for (const key in errorData.errors) {
        errors.push(
          {
            key: key,
            messages: errorData.errors[key]
          }
        );
      }

      console.log(errors);

      return errors;
    }

    return await res.json();
  }
}
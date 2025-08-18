export class RegistrationContr {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  async init () {
    this.view.onSubmit(async (newUser) => {
      try {
        const result = await this.model.createUser(newUser);
        if (!result.message) {
          this.view.showErrors(result);
          return;
        }

        this.view.showSuccess(result.message);

        setTimeout(() => {
          location.href = 'login.html';
        }, 2000);
      }
      catch(error) {
        console.log(error);
      }
    })
  }
}
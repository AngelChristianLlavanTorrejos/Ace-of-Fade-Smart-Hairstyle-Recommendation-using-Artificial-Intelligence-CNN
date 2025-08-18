export class LoginContr {
  constructor(model, view){
    this.model = model;
    this.view = view;
  }

  async init () {
    await this.view.onSubmit(async (credential) => {
      try {
        const result = await this.model.authenticateUser(credential);
        
        if (Array.isArray(result)) {
          this.view.showErrors(result);
          return;
        }
        
        if (result === 401) {
          this.view.showErrors(result);
          return;
        }

        this.view.showSuccess();

        setTimeout(() => {
          if (result.role === 'Client') {
            location.href = '../../client-pages/client-dashboard.html';
            return;
          }

          if (result.role === 'Administrator') {
            location.href = '../../admin-pages/admin-dashboard.html';
            return;
          }

          location.href = 'barber-dashboard.html';
        }, 2000);
      }
      catch (error) {
        console.log(error);
      }
    })
  }
}
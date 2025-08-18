export class RegistrationView {
  constructor() {
    this.registrationForm = document.querySelector('.js-registration-form');

    this.errorContainers = {
      firstName: document.querySelector('.js-first-name-error'),
      lastName: document.querySelector('.js-last-name-error'),
      email: document.querySelector('.js-email-error'),
      password: document.querySelector('.js-password-error'),
      confirmPassword: document.querySelector('.js-confirm-password-error')
    }

    this.successMessage = document.querySelector('.js-registration-success')

    this.clearErrorMessages();
  }

  onSubmit(callback) {
    this.registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(this.registrationForm);

      const newUser = {
        role: "Client",
        firstName: formData.get('first-name'),
        lastName: formData.get('last-name'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirm-password')
      };

      callback(newUser);
    })
  }

  showErrors(errors) {
    const keyMap = {
      Email: 'email',
      FirstName: 'firstName',
      LastName: 'lastName',
      Password: 'password',
      ConfirmPassword: 'confirmPassword'
    };

    errors.forEach(error => {
      const key = keyMap[error.key];
      if (key && this.errorContainers[key]) {
        this.errorContainers[key].innerHTML = error.messages.join('<br>');
      }
    });
  }

  showSuccess(successMessage) {
    this.successMessage.innerHTML = successMessage;
  }

  clearErrorMessages() {
    const inputElemenets = this.registrationForm.querySelectorAll('input');

    inputElemenets.forEach(element => {
      element.addEventListener('focus', () => {
        Object.values(this.errorContainers).forEach(container => {
          container.innerHTML = '';
        })
      })
    })
  }
}
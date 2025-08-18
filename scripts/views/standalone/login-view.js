export class LoginView {
  constructor () {
    this.loginForm = document.querySelector('.js-login-form');

    this.errorContainers = {
      email: document.querySelector('.js-email-error'),
      password: document.querySelector('.js-password-error')
    }

    this.isAuthorizeContainer = document.querySelector('.js-is-authorize');
    
    this.clearErrorMessages();
  }

  onSubmit (callback) {
    this.loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(this.loginForm);

      const credential = {
        email: formData.get('email'),
        password: formData.get('password')
      };

      callback(credential);
    })
  }

  showErrors (errors) {
    if (errors === 401) {
      this.isAuthorizeContainer.className = 'text-danger text-center js-is-authorize mt-2'
      this.isAuthorizeContainer.innerHTML = 'Credentials Is Incorrect';
      return;
    }

    const keyMap = {
      Email: 'email',
      Password: 'password'
    }

    errors.forEach(error => {
      const key = keyMap[error.key];
      if (key && this.errorContainers[key]) {
        this.errorContainers[key].innerHTML = error.messages.join('<br>');
      }
    });
  }

  showSuccess () {
    this.isAuthorizeContainer.className = 'text-success text-center js-is-authorize mt-2'
    this.isAuthorizeContainer.innerHTML = 'Login Successful';
  }

  clearErrorMessages() {
    const inputElemenets = this.loginForm.querySelectorAll('input');

    inputElemenets.forEach(element => {
      element.addEventListener('focus', () => {
        Object.values(this.errorContainers).forEach(container => {
          container.innerHTML = '';
        })

        this.isAuthorizeContainer.innerHTML = '';
      })
    })
  }
}
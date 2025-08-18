export const clientDashboardView = {
  personalInformation: document.querySelector('.js-personal-information'),
  updateContainer: document.querySelector('.js-update-container'),
  updateForm: document.querySelector('.js-update-form'),
  updateError: document.querySelector('.js-update-error'),
  changePassword: document.querySelector('.js-change-password'),
  passwordForm: document.querySelector('.js-password-form'),
  changePasswordResult: document.querySelector('.js-change-password-res'),

  labels: [
    'Client ID', 'Role', 'First Name', 'Middle Name', 'Last Name',
    'Gender', 'Birthdate', 'Contact No.', 'Address', 'Registration Date', 'Email'
  ],

  labelToKeyMap: {
    'Client ID': 'clientId',
    'Role': 'role',
    'First Name': 'firstName',
    'Middle Name': 'middleName',
    'Last Name': 'lastName',
    'Gender': 'gender',
    'Birthdate': 'birthdate',
    'Contact No.': 'contactNumber',
    'Address': 'address',
    'Registration Date': 'registrationDate',
    'Email': 'email'
  },

  createDiv(name) {
    const div = document.createElement('div');
    div.className = name;
    return div;
  },

  createLabel(name, label) {
    const labelElem = document.createElement('label');
    labelElem.className = name;
    labelElem.textContent = label;
    return labelElem;
  },

  createDataDiv(value) {
    const dataDiv = document.createElement('div');
    dataDiv.className = 'text-secondary w-75';

    if (value === null || value === undefined || value === '') {
      dataDiv.textContent = 'Not Set';
    } else {
      dataDiv.textContent = value;
    }

    return dataDiv;
  },

  async renderPersonalInformation(data) {
    this.personalInformation.innerHTML = '';

    this.labels.forEach(labelText => {
      const div = this.createDiv('mb-3 d-flex align-items-center');
      const label = this.createLabel('w-25', labelText);

      const key = this.labelToKeyMap[labelText];
      const value = data[key];

      const dataDiv = this.createDataDiv(value);

      div.appendChild(label);
      div.appendChild(dataDiv);

      this.personalInformation.appendChild(div);
    });
  },

  createInput(label, value) {
    const disabledFields = [
    'Client ID', 'First Name', 'Last Name', 'Role', 'Registration Date', 'Email'
    ];

    const input = document.createElement('input');
    input.name = label

    if (label === 'Birthdate') {
      input.type = 'date';
    } else if (label === 'Contact No.') {
      input.type = 'number';
    } else {
      input.type = 'text';
    }

    input.className = 'form-control text-secondary';
    input.value = value;
    input.placeholder = 'Not Set';

    if (input.name === 'Birthdate') {
      if (input.value !== '') {
        input.readOnly = true;
      }
    }

    if (input.name === 'Middle Name') {
      if (input.value !== '') {
        input.readOnly = true;
      }
    }

    if (disabledFields.includes(label)) {
      input.disabled = true;
    }

    return input;
  },

  createSelect(value) {
    const select = document.createElement('select');
    select.className = 'form-control';
    select.name = 'Gender';

    const isNotSet = (value === null || value === undefined || value === '');

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Not Set';
    placeholder.disabled = true;
    placeholder.selected = isNotSet;
    select.appendChild(placeholder);

    const male = document.createElement('option');
    male.value = 'Male';
    male.textContent = 'Male';
    male.selected = (value === 'Male');
    select.appendChild(male);

    const female = document.createElement('option');
    female.value = 'Female';
    female.textContent = 'Female';
    female.selected = (value === 'Female');
    select.appendChild(female);

    return select;
  },

  async renderUpdate (data) {
    this.updateContainer.innerHTML = '';

    this.labels.forEach(labelText => {
      const div = this.createDiv('col-6');
      const label = this.createLabel('text-secondary', labelText);

      const key = this.labelToKeyMap[labelText];
      const value = data[key];

      if (key != 'gender') {
        const input = this.createInput(labelText, value);
        div.appendChild(label);
        div.appendChild(input);
      }
      else {
        const select = this.createSelect(value);
        div.appendChild(label);
        div.appendChild(select);
      }

      this.updateContainer.appendChild(div);
    })
  },

  async onSubmit(callback) {
    this.updateForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const formData = new FormData(this.updateForm);

      const data = {
        middleName: formData.get('Middle Name') || null,
        gender: formData.get('Gender'),
        birthdate: formData.get('Birthdate') || null,
        contactNumber: formData.get('Contact No.') || null,
        address: formData.get('Address') || null
      };

      const errors = [];

      if (data.contactNumber !== null && data.contactNumber !== '') {
        const contactPattern = /^09\d{9}$/;
        if (!contactPattern.test(data.contactNumber)) {
          errors.push('Contact Number Must Be In The Format 09123456789');
        }
      }

      if (data.birthdate !== null && data.birthdate !== '') {
        const birthDateObj = new Date(data.birthdate);
        const now = new Date();
        const earliestDate = new Date('1900-01-01');

        if (isNaN(birthDateObj.getTime())) {
          errors.push('Birthdate Is Not A Valid Date');
        } else if (birthDateObj > now) {
          errors.push('Birthdate Cannot Be In The Future');
        } else if (birthDateObj < earliestDate) {
          errors.push('Birthdate Is Unrealistically Old');
        }
      }

      if (errors.length > 0) {
        this.renderErrors(errors, false);
        return;
      }

      this.renderErrors(errors, true);

      callback(data);
    });
  },

  renderErrors (err, isSuccess) {
    if (isSuccess) {
      this.updateError.className = 'text-success text-center mt-3';
      this.updateError.innerHTML = 'Update Successful';
    }
    else {
      this.updateError.className = 'text-danger text-center mt-3';
      this.updateError.innerHTML = `${err}`
    }

    setTimeout(() => {
      this.updateError.innerHTML = ''
    }, 2000)
  },

  async renderChangePassword() {
    this.changePassword.innerHTML = '';

    const labels = ['Current Password', 'New Password', 'Confirm Password'];
    const names = ['current-password', 'new-password', 'confirm-password'];
    
    labels.forEach((labelText, index) => {
        const name = names[index];
        
        const div = this.createDiv('mb-3 d-flex align-items-center');
        
        const label = document.createElement('label');
        label.for = name;
        label.textContent = labelText;
        label.className = 'w-25'
        
        const input = document.createElement('input');
        input.className = 'form-control text-secondary w-75';
        input.name = name;
        input.type = 'password';
        input.placeholder =`Enter ${labelText}`;
        input.id = name;
        input.value = '';
        
        div.appendChild(label);
        div.appendChild(input);
        
        this.changePassword.appendChild(div);
    });
  },

  async onSubmitPasswordForm (callback) {
    this.passwordForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const passwordFormData = new FormData(this.passwordForm);

      const data = {
        currentPassword: passwordFormData.get('current-password'),
        newPassword: passwordFormData.get('new-password'),
        confirmPassword: passwordFormData.get('confirm-password'),
      }

      callback(data);
    })
  },

  async showChangePasswordErrors (res) {
    if (res) {
      this.changePasswordResult.className = 'text-success text-center mt-3';
      this.changePasswordResult.innerHTML = 'Change Password Successful';
    }
    else {
      this.changePasswordResult.className = 'text-danger text-center mt-3';
      this.changePasswordResult.innerHTML = 'Change Password Failed'
    }

    setTimeout(() => {
      this.changePasswordResult.innerHTML = ''
    }, 2000)
  }
};
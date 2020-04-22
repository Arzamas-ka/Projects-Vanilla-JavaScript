const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');

const EMPTY_STRING = '';

// Show input error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
};

// Show success outline
const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
};

// Check email is valid
const checkEmail = (input) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test) {
    showSuccess(input.value.trim());
  } else {
    showError(input, 'Email is not valid');
  }
};

// Check password match
const checkPasswordMatch = (input, inputConfirm) => {
  if (input.value !== inputConfirm.value) {
    showError(inputConfirm, 'Passwords do not match');
  }
};

// Check required fields
const checkRequired = (...input) => {
  [...input].forEach((input) => {
    if (input.value.trim() === EMPTY_STRING) {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at list ${min} characters`
    );
  } else {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  }
};

// Event listeners
form.addEventListener('submit', (event) => {
  event.preventDefault();

  checkRequired(username, email, password, passwordConfirm);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, passwordConfirm);
});

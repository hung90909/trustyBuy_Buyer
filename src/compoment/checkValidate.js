export const checkEmail = email => {
  const format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!email.trim()) {
    return ''; // Email is empty
  } else if (!format.test(email)) {
    return false; // Email format is incorrect
  } else {
    return true; // Email is valid
  }
};

export const checkPassword = password => {
  if (!password.trim()) {
    return 'no'; // Password is empty
  } else if (password.length < 6) {
    return false; // Password is less than 6 characters
  } else {
    return true; // Password is valid
  }
};

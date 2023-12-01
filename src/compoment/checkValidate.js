export const checkEmail = (email) => {
  const format = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!format.test(email)) {
    return false
  } else if (email === "") {
    return "no"
  } else {
    return true
  }
}

export const checkPassword = (text) => {
  if (text.length > 15) {
    return false
  } else {
    return true
  }
}
// utils.js
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate password complexity
function validatePassword(password) {
  // Minimum length: 8 characters
  // Must contain at least one uppercase letter
  // Must contain at least one lowercase letter
  // Must contain at least one digit (number)
  // Must contain at least one special character
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

module.exports = { validatePassword };

module.exports = {
  validateEmail,
  validatePassword,
};

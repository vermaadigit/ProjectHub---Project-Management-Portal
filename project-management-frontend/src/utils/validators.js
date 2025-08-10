export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUsername = (username) => {
  if (!username || username.length < 3) {
    return "Username must be at least 3 characters long";
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return "Username can only contain letters, numbers, and underscores";
  }
  if (username.length > 50) {
    return "Username must be less than 50 characters";
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    return "Password must be at least 6 characters long";
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
  }
  return null;
};

export const validateName = (name, fieldName = "Name") => {
  if (name && name.length > 50) {
    return `${fieldName} must be less than 50 characters`;
  }
  return null;
};

export const validateRequired = (value, fieldName) => {
  if (!value || !value.toString().trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateLength = (value, min, max, fieldName) => {
  if (!value) return null;

  if (min && value.length < min) {
    return `${fieldName} must be at least ${min} characters`;
  }
  if (max && value.length > max) {
    return `${fieldName} must be less than ${max} characters`;
  }
  return null;
};

export const validateForm = (data, rules) => {
  const errors = {};

  Object.keys(rules).forEach((field) => {
    const fieldRules = rules[field];
    const value = data[field];

    fieldRules.forEach((rule) => {
      if (errors[field]) return; // Skip if already has error

      const error = rule(value);
      if (error) {
        errors[field] = error;
      }
    });
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

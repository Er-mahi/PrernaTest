// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password: string): {
  isValid: boolean;
  strength: number;
  errors: string[];
} => {
  const errors: string[] = [];
  let strength = 0;

  // Minimum length
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  } else {
    strength++;
  }

  // Contains uppercase
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  } else {
    strength++;
  }

  // Contains lowercase
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  } else {
    strength++;
  }

  // Contains number
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  } else {
    strength++;
  }

  // Contains special character
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  } else {
    strength++;
  }

  return {
    isValid: errors.length === 0,
    strength,
    errors
  };
};

// Name validation
export const validateName = (name: string): boolean => {
  return name.trim().length >= 2 && name.trim().length <= 50;
};

// Phone validation (Indian format)
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

// OTP validation
export const validateOTP = (otp: string): boolean => {
  return /^\d{6}$/.test(otp);
};

// Form validation utilities
export const required = (value: string): string | null => {
  return value.trim() ? null : 'This field is required';
};

export const minLength = (min: number) => (value: string): string | null => {
  return value.length >= min ? null : `Must be at least ${min} characters`;
};

export const maxLength = (max: number) => (value: string): string | null => {
  return value.length <= max ? null : `Must be no more than ${max} characters`;
};

export const email = (value: string): string | null => {
  return validateEmail(value) ? null : 'Please enter a valid email address';
};

export const password = (value: string): string | null => {
  const validation = validatePassword(value);
  return validation.isValid ? null : validation.errors[0];
};

export const confirmPassword = (password: string) => (value: string): string | null => {
  return value === password ? null : 'Passwords do not match';
};

export const name = (value: string): string | null => {
  return validateName(value) ? null : 'Name must be between 2 and 50 characters';
};

export const phone = (value: string): string | null => {
  return validatePhone(value) ? null : 'Please enter a valid 10-digit phone number';
};

export const otp = (value: string): string | null => {
  return validateOTP(value) ? null : 'OTP must be 6 digits';
};

// Composite validators
export const createValidator = (...validators: Array<(value: string) => string | null>) => {
  return (value: string): string | null => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  };
};

// Form validation helper
export const validateForm = <T extends Record<string, any>>(
  data: T,
  rules: Record<keyof T, (value: any) => string | null>
): { isValid: boolean; errors: Record<keyof T, string | null> } => {
  const errors = {} as Record<keyof T, string | null>;
  let isValid = true;

  (Object.keys(rules) as Array<keyof T>).forEach((key) => {
    const error = rules[key](data[key]);
    errors[key] = error;
    if (error) isValid = false;
  });

  return { isValid, errors };
};


// Sanitization utilities
export const sanitizeHtml = (str: string): string => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

export const stripTags = (str: string): string => {
  return str.replace(/<[^>]*>/g, '');
};

export const normalizePhone = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

export const capitalizeWords = (str: string): string => {
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};
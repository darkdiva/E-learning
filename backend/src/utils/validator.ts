import {User} from '../../models/User';
export const validateUser = (user: User): string[] => {
  const errors: string[] = [];

  if (!user.fullName) {
    errors.push('Username is required');
  }

  if (!user.email) {
    errors.push('Email is required');
  } else {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(user.email)) {
      errors.push('Invalid email format');
    }
  }

  if (!user.password) {
    errors.push('Password is required');
  } else if (user.password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  return errors;
};

const BASE_URL = 'http://localhost:3000';

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(`${BASE_URL}/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const login = async (userData: { email: string; password: string }) => {
  const response = await fetch(`${BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};
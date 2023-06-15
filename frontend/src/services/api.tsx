

const BASE_URL = 'http://localhost:3000';

export const register = async (userData: {
  fullName: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(`${BASE_URL}/api/SignUp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const Signin = async (userData: { email: string; password: string }) => {
  const response = await fetch(`${BASE_URL}/api/Signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  return response.json();
};














    
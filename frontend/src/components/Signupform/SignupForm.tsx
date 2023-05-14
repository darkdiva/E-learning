import React, { useState } from 'react';
import  {useNavigate}  from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
  const [fullName, setfullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setcountry] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/api/signup', {
        fullName,
        email,
        password,
        country,
        dateOfBirth
      });

      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('Failed to sign up');
    }
  };

  return (
    <form onSubmit={handleSignup}>
      {error && <div>{error}</div>}
      <div>
        <label>
          fullName:
          <input
            type="text"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Country:
          <input
            type="text"
            value={country}
            onChange={(e) => setcountry(e.target.value)}
          />
<div>
        <label>
          Date of birth:
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </label>
      </div>
        </label>
      </div>
      <button type="submit">Sign up</button>
    </form>
  );
};

export default SignupForm;

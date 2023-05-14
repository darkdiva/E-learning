import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/signin', {
        email,
        password
      });

      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('Failed to sign in');
    }
  };

  return (
    <form onSubmit={handleSignin}>
      {error && <div>{error}</div>}
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
      <button type="submit">Sign in</button>
    </form>
  );
};

export default SigninForm;

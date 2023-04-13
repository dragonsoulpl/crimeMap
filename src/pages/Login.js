import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Call your backend API here to validate the username and password
      const response = await fetch('https://api.crimemap.hopto.org/login', {

        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // Redirect to the homepage if login is successful
        navigate.push('/');
      } else {
        // Display an error message if login fails
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
      setError('Something went wrong. Please try again later.');
    }
  };

  const handleCreateAccount = () => {
    // Redirect the user to the create account page
    navigate.push('/create-account');
  };

  return (
    <div className="container">
      <h1>Welcome to CrimeMap</h1>
      <form onSubmit={handleLogin}>
        {error && <div className="error">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="form-control"
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-control"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleCreateAccount}>
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Login;
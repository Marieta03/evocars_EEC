import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: email,
        contrasena: password,  // Asegúrate de usar 'contrasena' en lugar de 'password' para coincidir con tu backend
      });

      // Guarda el token y la información del usuario en localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userInfo', JSON.stringify(response.data.userInfo)); // Almacena userInfo como JSON string
      window.location.href = '/';
      setIsAuthenticated(true);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Contraseña incorrecta. Por favor, inténtelo de nuevo.');
      } else {
        setError('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
      }
      console.error('Error al iniciar sesión:', error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container">
      <div className="login-form">
        <div className="form-content">
          <h2>LOGIN</h2>
          <p>Welcome to EVOCARS</p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          <p className="text-center">
            No tienes cuenta? <a href="/register" className="link">Registrate</a>
          </p>
        </div>
        <div className="logo">
          <img src="logo.png" alt="EVOCARS Logo" />
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  // Estado para manejar si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Estado para almacenar el rol del usuario
  const [userRole, setUserRole] = useState(null);
  // Hook de React Router para obtener la ubicación actual
  const location = useLocation();

  // useEffect para verificar si el usuario está logueado cuando se monta el componente
  useEffect(() => {
    // Obtén el token del almacenamiento local
    const token = localStorage.getItem('token');
    // Obtén la información del usuario del almacenamiento local
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (token && userInfo) {
      // Si hay token e información de usuario, actualiza el estado
      setIsLoggedIn(true);
      setUserRole(userInfo.id_rol); // Asegúrate de que el campo sea correcto
    }
  }, []);

  // Función para manejar el logout
  const handleLogout = () => {
    // Remueve el token e información del usuario del almacenamiento local
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    // Actualiza el estado
    setIsLoggedIn(false);
    setUserRole(null);
    // Redirige al usuario a la página de inicio
    window.location.href = '/';
  };

  // Ocultar NavBar en vistas de Login y Registro
  if (location.pathname.includes('/login') || location.pathname.includes('/register')) {
    return null; // No renderizar el NavBar en las páginas de login o registro
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="EVOCARS Logo" />
      </div>
      <ul className="navbar-menu">
        {/* Enlaces visibles para todos los usuarios */}
        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/cars" activeClassName="active">Carros</NavLink></li>
        <li><NavLink to="/contacts" activeClassName="active">Contactos</NavLink></li>
        <li><NavLink to="/profile" activeClassName="active">Perfil</NavLink></li>
        {isLoggedIn ? (
          <>
            {/* Opciones adicionales solo para usuarios logueados que no son administradores */}
            {userRole !== 1 && (
              <li>
                <div className="dropdown">
                  <button className="dropbtn" >Administradores</button>
                  <div className="dropdown-content">
                    <div className="dropdown-submenu">
                      <NavLink to="/compras">Compras</NavLink>
                      <NavLink to="/usuarios">Usuarios</NavLink>
                      <NavLink to="/productos">Productos</NavLink>
                    </div>
                  </div>
                </div>
              </li>
            )}
          </>
        ) : null}
      </ul>
      {isLoggedIn ? (
        <ul className="navbar-menu-right">
          {/* Botón para cerrar sesión */}
          <li><button onClick={handleLogout}>Cerrar sesion</button></li>
        </ul>
      ) : (
        // Enlace de Login y Registro para usuarios no logueados
        <ul className="navbar-menu-right">
          <li><NavLink to="/login" activeClassName="active">Iniciar Sesion | Registrarse</NavLink></li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
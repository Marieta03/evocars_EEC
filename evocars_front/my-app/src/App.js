import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './views/Home/Home';
import Cars from './views/Cars/Cars';
import Contacts from './views/Contacts/Contacts';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import Ticket from './views/Ticket/Ticket';
import UserList from './views/UserList/UserList';
import UserForm from './views/UserForm/UserForm';
import ComprasList from './views/Compras/ComprasList';
import ComprasForm from './views/Compras/ComprasForm';
import ProductosList from './views/ProductosList/ProductosList';
import ProductosForm from './views/ProductosForm/ProductosForm';
import ProfileView from './views/Profile/ProfileView';
import EditProfileForm from './views/Profile/EditProfileForm';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token en localStorage al cargar la aplicación
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <div>
        {!["/login", "/register"].includes(window.location.pathname) && <NavBar />}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/ticket" element={<Ticket />} />
            <Route 
              path="/login" 
              element={isAuthenticated ? <Navigate to="/" /> : <Login />} 
            />
            <Route 
              path="/register" 
              element={isAuthenticated ? <Navigate to="/" /> : <Register />} 
            />
            <Route path="/usuarios" element={<UserList />} />
            <Route path="/usuarios/create" element={<UserForm />} />
            <Route path="/usuarios/edit/:id" element={<UserForm />} />
            <Route path="/compras" element={<ComprasList />} />
            <Route path="/compras/new" element={<ComprasForm />} />
            <Route path="/compras/edit/:id" element={<ComprasForm />} />
            <Route path="/productos" element={<ProductosList />} />
        <Route path="/productos/new" element={<ProductosForm />} />
        <Route path="/productos/edit/:id" element={<ProductosForm />} />
        <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/edit" element={<EditProfileForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

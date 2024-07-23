import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/usuarios')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8080/api/usuarios/${id}`)
      .then(() => setUsers(users.filter(user => user.id_usuarios !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="user-list-container">
      <br></br>
      <br></br>
      <br></br>
      <h2 className="user-list-title">Lista de Usuarios</h2>
      <Link to="/usuarios/create" className="create-user-button">Crear Nuevo Usuario</Link>
      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Fecha de Nacimiento</th>
              <th>Género</th>
              <th>Rol</th>
              <th>Foto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id_usuarios}>
                <td>{user.nombre}</td>
                <td>{user.email}</td>
                <td>{user.fecha_nac}</td>
                <td>{user.genero}</td>
                <td>{user.id_rol}</td>
                <td>
                  {user.foto && (
                    <img src={`${user.foto}`} alt="Foto de Perfil" className="user-photo" />
                  )}
                </td>
                <td className="action-buttons">
                  <Link to={`/usuarios/edit/${user.id_usuarios}`} className="edit-button">Editar</Link>
                  <button onClick={() => deleteUser(user.id_usuarios)} className="delete-button">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
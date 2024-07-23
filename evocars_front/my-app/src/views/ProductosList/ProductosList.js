import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductosList.css';

function ProductosList() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/carros');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const deleteCar = async (id_carro) => {
    try {
      await axios.delete(`http://localhost:8080/api/carros/${id_carro}`);
      setCars(cars.filter(car => car.id_carro !== id_carro));
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  return (
    <div className="productos-list">
      <br></br>
      <br></br>
      <br></br>
      <h1>Lista de Carros</h1>
      <Link to="/productos/new" className="button">Agregar Nuevo Carro</Link>
      <table className="cars-table">
        <thead>
          <tr>
            <th>Modelo</th>
            <th>Cilindros</th>
            <th>Potencia</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Motor</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cars.map(car => (
            <tr key={car.id_carro}>
              <td>{car.modelo}</td>
              <td>{car.cilindros}</td>
              <td>{car.potencia}</td>
              <td>{car.color}</td>
              <td>${car.precio.toLocaleString()} MXN</td>
              <td>{car.motor}</td>
              <td>
                {car.foto && (
                  <img src={car.foto} alt={car.modelo} className="car-image" />
                )}
              </td>
              <td className="action-buttons">
                <Link to={`/productos/edit/${car.id_carro}`} className="button edit-button">Editar</Link>
                <button onClick={() => deleteCar(car.id_carro)} className="button delete-button">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductosList;

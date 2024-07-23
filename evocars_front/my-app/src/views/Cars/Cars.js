import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cars.css';

function Cars() {
  const [cars, setCars] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const navigate = useNavigate();
  
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

  const handleBuy = async (carId) => {
    if (!userInfo || !userInfo.id_usuarios) {
      console.error('Error: User ID is missing.');
      return;
    }

    const confirmPurchase = window.confirm('¿Está seguro de que desea comprar este coche?');

    if (!confirmPurchase) {
      return;
    }

    const compra = {
      id_usuarios: userInfo.id_usuarios,
      id_carro: carId,
      pago: 'Tarjeta de crédito',
      fecha_compra: new Date().toISOString(),
      estado: 'Pagado'
    };

    console.log('Compra data:', compra);

    try {
      const response = await axios.post('http://localhost:8080/api/compra', compra, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Response:', response);
      if (response.status === 200 || response.status === 201) {
        navigate('/ticket', { state: { id_compra: response.data.id_compra } }); // Pasar el id_compra a /ticket
      }
    } catch (error) {
      console.error('Error creating purchase:', error);
    }
  };

  const getColorIcon = (colorId) => {
    switch (colorId) {
      case 1:
        return <i className="fas fa-circle" style={{ color: 'red' }}></i>;
      case 2:
        return <i className="fas fa-circle" style={{ color: 'blue' }}></i>;
      default:
        return <i className="fas fa-circle" style={{ color: 'gray' }}></i>;
    }
  };

  return (
    <div className="cars-app">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div className="content">
        <div className="cars-container">
          {cars.map(car => (
            <div className="car" key={car.id_carro}>
              <div className="car-image-container">
                <img src={car.foto} alt={car.modelo} className="car-image1" />
              </div>
              <div className="car-info">
                <h2 className="car-title">{car.modelo}</h2>
                <p className="car-price">${car.precio.toLocaleString()} MXN</p>
                <div className="car-details">
                  <p className="car-detail"><i className="fas fa-cylinder"></i> Cilindros: {car.cilindros}</p>
                  <p className="car-detail"><i className="fas fa-bolt"></i> Potencia: {car.potencia}</p>
                  <p className="car-detail"><i className="fas fa-paint-brush"></i> Color: {car.color}</p>
                </div>
                <button onClick={() => handleBuy(car.id_carro)} className="car-buy-button">Comprar</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cars;
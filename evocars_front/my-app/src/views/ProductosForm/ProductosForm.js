import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductosForm.css';

function ProductosForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({
    modelo: '',
    cilindros: '',
    potencia: '',
    color: '',
    precio: '',
    motor: '',
    foto: ''
  });

  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/carros/${id}`);
          setCar(response.data);
        } catch (error) {
          console.error('Error fetching car:', error);
        }
      };

      fetchCar();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar({ ...car, [name]: value });
  };

  const handleFileChange = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setCar({ ...car, foto: e.target.result });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...car };

    try {
      if (id) {
        await axios.put(`http://localhost:8080/api/carros/${id}`, payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      } else {
        await axios.post('http://localhost:8080/api/carros', payload, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      navigate('/productos');
    } catch (error) {
      console.error('Error saving car:', error);
    }
  };

  return (
    <div className="productos-form">
      <br></br>
      <br></br>
      <h1>{id ? 'Editar Carro' : 'Agregar Carro'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="modelo">Modelo</label>
          <input
            type="text"
            name="modelo"
            value={car.modelo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cilindros">Cilindros</label>
          <input
            type="text"
            name="cilindros"
            value={car.cilindros}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="potencia">Potencia</label>
          <input
            type="text"
            name="potencia"
            value={car.potencia}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input
            type="text"
            name="color"
            value={car.color}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            name="precio"
            value={car.precio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="motor">Motor</label>
          <input
            type="text"
            name="motor"
            value={car.motor}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="foto">Foto</label>
          <input
            type="file"
            name="foto"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="button">Guardar</button>
      </form>
    </div>
  );
}

export default ProductosForm;

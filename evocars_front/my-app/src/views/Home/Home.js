import React, { useEffect, useState } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const images = ['fondo1.jpg', 'fondo2.jpg', 'fondo3.jpg', 'fondo4.jpg'];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  const [flipped, setFlipped] = useState({
    marieta: false,
    cristian: false,
    erick: false,
  });

  const handleFlip = (developer) => {
    setFlipped((prevState) => ({
      ...prevState,
      [developer]: !prevState[developer],
    }));
  };

  return (
    <div className="home-page">
      <div className="background-container" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}></div>
      <div className="overlay"></div>
      <div className="container">
        <header className="header">
          <div className="logo">
            <img src="logo.png" alt="Logo" />
          </div>
          <nav className="nav">
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/cars">Cars</a></li>
              <li><a href="/contacts">Contacts</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </nav>
          <button className="login-button">Login</button>
        </header>

        <main className="main">
          <div className="menu-space"></div>

          <section className="hero">
            <div className="hero-text">
              <h1>Bienvenido a Evo<span className="red-text">Cars</span></h1>
              <p>¡Estamos listos para ofrecerte la mejor experiencia en ventas de coches! Nos enorgullece brindar un servicio excepcional que se adapta a tus necesidades. Contamos con una amplia variedad de vehículos</p>
              
            </div>
            <div className="hero-image">
              <img src="car.jpeg" alt="Car" />
            </div>
          </section>

          <section className="about">
            <div className="about-content">
              <img className="about-logo" src="logo.png" alt="About Logo" />
              <div className="about-text">
                <h2>Sobre Nostros</h2>
                <p>Somos un equipo especializado comprometido en ofrecer servicios confiables de alquiler de autos. Una de nuestras ventajas es ofrecer precios competitivos y transparentes. Proporcionamos servicios como seguros completos...</p>
              </div>
            </div>
          </section>

          <section className="developers">
            <h2>Developers</h2>
            <div className="developer">
              <div className={`developer-info ${flipped.marieta ? 'flipped' : ''}`} onClick={() => handleFlip('marieta')}>
                <div className="front">
                  <FontAwesomeIcon icon={faUser} size="3x" />
                </div>
                <div className="back">
                  <p>Marieta Martínez</p>
                  <p>Fullstack Developer</p>
                </div>
              </div>
              <div className={`developer-info ${flipped.cristian ? 'flipped' : ''}`} onClick={() => handleFlip('cristian')}>
                <div className="front">
                  <FontAwesomeIcon icon={faUser} size="3x" />
                </div>
                <div className="back">
                  <p>Cristian Pacheco</p>
                  <p>Fullstack Developer</p>
                </div>
              </div>
              <div className={`developer-info ${flipped.erick ? 'flipped' : ''}`} onClick={() => handleFlip('erick')}>
                <div className="front">
                  <FontAwesomeIcon icon={faUser} size="3x" />
                </div>
                <div className="back">
                  <p>Erick Polanco</p>
                  <p>Fullstack Developer</p>
                </div>
                <br></br>
                
              </div>
            </div>
          </section>
          <footer className="footer">
            <p>&copy; 2024 EvoCars. All rights reserved.</p>
          </footer>

        </main>
      </div>
    </div>
  );
}

export default Home;
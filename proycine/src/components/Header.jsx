import  { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginModal from './LoginModal'; // Importa el componente LoginModal
import CinemasEndPoint from '../services/CinemasEndPoint';

const Header = ({ showFilters, setIsFiltersValid, selectedCinema, setSelectedCinema, selectedDate, setSelectedDate }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Estado para controlar la visibilidad del modal de inicio de sesión
  const cinemasData = CinemasEndPoint();
  const { pathname } = useLocation();

  useEffect(() => {
    const savedCinema = localStorage.getItem("selectedCinema");
    const savedDate = localStorage.getItem("selectedDate");
    if (savedCinema) setSelectedCinema(savedCinema);
    if (savedDate) setSelectedDate(savedDate);
  }, [setSelectedCinema, setSelectedDate]);

  useEffect(() => {
    if (selectedCinema && selectedDate && setIsFiltersValid) {
      setIsFiltersValid(true);
    } else if (setIsFiltersValid) {
      setIsFiltersValid(false);
    }
  }, [selectedCinema, selectedDate, setIsFiltersValid]);

  const handleCinemaChange = event => {
    const selectedCinema = event.target.value;
    setSelectedCinema(selectedCinema);
    setSelectedDate('');
    localStorage.setItem("selectedCinema", selectedCinema);
  };
  
  const handleDateChange = event => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    localStorage.setItem("selectedDate", selectedDate);
  };

  // Función para manejar el filtro por género
  const handleGenreFilter = genre => {
    setSelectedGenre(genre); // Actualizamos el género seleccionado
    // Redirigimos al usuario a la página correspondiente
    window.location.href = `/movies/${genre}`;
  };

  const cinemas = cinemasData ? Object.keys(cinemasData) : [];
  const dates = selectedCinema && cinemasData[selectedCinema] ? Object.keys(cinemasData[selectedCinema]) : [];
  const isHome = pathname === '/';

  return (
    <header className="bg-black text-white py-8 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center fixed top-0 w-full z-10">
      <div className="flex items-center flex-shrink-0 mb-2 sm:mb-0">
        <Link to="/">
          <img src="https://archivos.cinecolombia.com/cineco-cms-frontend/1.0.119/dist/images/logo_cineco.svg" alt="Logo" className="h-6 w-auto mt-2 sm:h-8 sm:w-auto" />
        </Link>
      </div>
      {showFilters && (
        <div className="hidden lg:flex justify-center space-x-2 md:space-x-4 mb-4 md:mb-0 mt-2 sm:mt-0">
          <button onClick={() => handleGenreFilter('Acción')} className={`bg-blue-500 text-white px-2 py-1 sm:px-6 py-2 rounded-full ${selectedGenre === 'Acción' ? 'bg-red-500' : ''}`}>Acción</button>
          <button onClick={() => handleGenreFilter('Terror')} className={`bg-blue-500 text-white px-2 py-1 sm:px-6 py-2 rounded-full ${selectedGenre === 'Terror' ? 'bg-red-500' : ''}`}>Terror</button>
          <button onClick={() => handleGenreFilter('Ciencia Ficción')} className={`bg-blue-500 text-white px-2 py-1 sm:px-6 py-2 rounded-full ${selectedGenre === 'Ciencia Ficción' ? 'bg-red-500' : ''}`}>Ciencia Ficción</button>
          <button onClick={() => handleGenreFilter('Comedia')} className={`bg-blue-500 text-white px-2 py-1 sm:px-6 py-2 rounded-full ${selectedGenre === 'Comedia' ? 'bg-red-500' : ''}`}>Comedia</button>
        </div>
      )}
      <div className="flex flex-col sm:flex-row items-center">
        <div className="mr-2 mb-2 sm:mb-0">
          <span className="block text-xs sm:text-sm mb-1">Cines cercanos</span>
          <div className="flex">
            <select
              className={`px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-black text-white text-xs sm:text-sm ${!isHome ? 'pointer-events-none' : ''}`}
              value={selectedCinema}
              onChange={handleCinemaChange}
              disabled={!isHome}
            >
              <option value="">Seleccione un cine</option>
              {cinemas.map(cinema => (
                <option key={cinema} value={cinema}>
                  {cinema}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mr-2 mb-2 sm:mb-0">
          <span className="block text-xs sm:text-sm mb-1">Fecha</span>
          <div className="flex">
            <select
              className={`px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-black text-white mr-2 sm:mr-4 text-xs sm:text-sm ${!isHome ? 'pointer-events-none' : ''}`}
              value={selectedDate}
              onChange={handleDateChange}
              disabled={!isHome}
            >
              <option value="">Seleccione una fecha</option>
              {dates.map(date => (
                <option key={date} value={date}>
                  {date}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Mostrar el componente LoginModal si el estado isLoginModalOpen es true */}
        {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}

        {/* Mostrar el enlace solo si el modal de inicio de sesión no está abierto */}
        {!isLoginModalOpen && (
          <button onClick={() => setIsLoginModalOpen(true)}>
            <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="Icono perfil" className="w-8 mt-4 sm:w-12  sm:mr-0 lg:mr-4"/>
          </button>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  showFilters: PropTypes.bool.isRequired,
  setIsFiltersValid: PropTypes.func,
  selectedCinema: PropTypes.string.isRequired,
  setSelectedCinema: PropTypes.func.isRequired,
  selectedDate: PropTypes.string.isRequired,
  setSelectedDate: PropTypes.func.isRequired,
};

export default Header;

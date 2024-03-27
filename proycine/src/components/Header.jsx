import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Importa PropTypes

const Header = ({ showFilters }) => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState("");
  const navigate = useNavigate();

  const handleCinemaChange = (event) => {
    setSelectedCinema(event.target.value);
  };

  const handleGenreFilter = (genre) => {
    setSelectedGenre(genre);
    navigate(`/movies/${genre}`);
  };

  useEffect(() => {
    const savedCinema = localStorage.getItem("selectedCinema");
    if (savedCinema) {
      setSelectedCinema(savedCinema);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedCinema", selectedCinema);
  }, [selectedCinema]);

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
              className="px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-black text-white text-xs sm:text-sm"
              value={selectedCinema}
              onChange={handleCinemaChange}
            >
              <option value="">Seleccione un cine</option>
              <option value="Titan">Titan</option>
              <option value="Unicentro">Unicentro</option>
              <option value="Santa Fe">Santa Fe</option>
              <option value="Americas">Americas</option>
              <option value="Centro Mayor">Centro Mayor</option>
            </select>
          </div>
        </div>
        <div className="mr-2 mb-2 sm:mb-0">
          <span className="block text-xs sm:text-sm mb-1">Fecha</span>
          <div className="flex">
            <select
              className="px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-black text-white mr-2 sm:mr-4 text-xs sm:text-sm"
            >
              <option value="">Seleccione una fecha</option>
              <option value="01 de Abril">01 de Abril</option>
              <option value="02 de Abril">02 de Abril</option>
              <option value="03 de Abril">03 de Abril</option>
              <option value="04 de Abril">04 de Abril</option>
              <option value="05 de Abril">05 de Abril</option>
            </select>
          </div>
        </div>
        <Link to="/perfil">
          <img src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" alt="Icono perfil" className="w-8 mt-4 sm:w-12  sm:mr-0 lg:mr-4"/>
        </Link>
      </div>
    </header>
  );
};

Header.propTypes = {
  showFilters: PropTypes.bool.isRequired, // Validación del prop showFilters
};

export default Header;

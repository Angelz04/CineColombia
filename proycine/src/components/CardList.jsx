import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardEndpoint from '../services/CardEndPoint';
import PropTypes from 'prop-types';

const CardList = ({ isFiltersValid }) => {
  const data = CardEndpoint();
  const [linkEnabled, setLinkEnabled] = useState(false); // Estado para habilitar/deshabilitar el enlace

  useEffect(() => {
    // Habilitar el enlace si los filtros son válidos
    setLinkEnabled(isFiltersValid);
  }, [isFiltersValid]);

  return (
    <div>
      <h2 className="text-2xl text-gray-500 text-start p-4 md:p-20">EN CARTELERA</h2>
      <div className="flex flex-wrap justify-center pb-4">
        {data.map((movie, index) => (
          <div key={index} className="max-w-80 w-full md:w-1/2 lg:w-1/4 p-2 md:p-4">
            {/* Agregar el atributo disabled al enlace cuando los filtros no son válidos */}
            <Link to={`/details/${encodeURIComponent(movie.name)}`} className={`cursor-pointer ${!linkEnabled && 'pointer-events-none'}`}>
              <div className="relative">
                <img className="w-full h-auto object-cover opacity-100 pb-4" src={movie.img} alt={movie.name} />
              </div>
              <div className="text-start">
                <h3 className="text-xl font-normal mb-2">{movie.name}</h3>
                <p className="text-sm mb-1">Titulo en español: {movie.titleSpanish}</p>
                <p className="text-sm mb-1">Estreno: {movie.premiere}</p>
                <p className="text-sm mb-1">Género: {movie.Genre}</p>
                <div className={`bg-gray-200 text-sm inline-block rounded-lg px-2 py-1 mb-1 mr-2 ${movie.Category.includes('Mayores de 15 años') ? 'text-red-500' : 'text-black-500'}`}>{movie.Category}</div>
                <div className="bg-gray-200 text-sm inline-block rounded-lg px-2 py-1 mb-1">{movie.Duration}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};


CardList.propTypes = {
  isFiltersValid: PropTypes.bool.isRequired,
};

export default CardList;

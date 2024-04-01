import  { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CardEndpoint from '../services/CardEndPoint';
import Header from './Header';

const FilteredMovies = () => {
  const { genre } = useParams();
  const data = CardEndpoint();

  const normalizedGenre = genre.toLowerCase();

  const filteredMovies = data.filter(movie => {
    const movieGenres = movie.Genre.toLowerCase().split(',').map(genre => genre.trim());
    return movieGenres.includes(normalizedGenre);
  });

  // Definir y actualizar el estado para las propiedades requeridas
  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <div>
      <Header
        showFilters={true}
        selectedCinema={selectedCinema}
        setSelectedCinema={setSelectedCinema}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <h2 className="text-2xl text-gray-500 text-start p-4 md:p-20">Películas de {genre}</h2>
      <div className="flex flex-wrap justify-center pb-4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <Link
              to={`/details/${encodeURIComponent(movie.name)}`}
              key={index}
              className="max-w-80 w-full md:w-1/2 lg:w-1/4 p-2 md:p-4"
            >
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
          ))
        ) : (
          <p>No hay películas disponibles para el género {genre}.</p>
        )}
      </div>
    </div>
  );
};

export default FilteredMovies;

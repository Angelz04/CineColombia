import { Link, useParams } from 'react-router-dom';
import CardEndpoint from '../services/CardEndPoint';
import Header2 from './Header2';

const FilteredMovies2 = () => {
  const { genre } = useParams();
  const data = CardEndpoint();

  const normalizedGenre = genre.toLowerCase();

  const filteredMovies = data.filter(movie => {
    const movieGenres = movie.Genre.toLowerCase().split(',').map(genre => genre.trim());
    return movieGenres.includes(normalizedGenre);
  });



  return (
    <div>
      <Header2
      />
      <h2 className="text-2xl text-gray-500 text-start p-4 md:p-20">Películas de {genre}</h2>
      <div className="flex flex-wrap justify-center pb-4">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <Link
              to={`/adminDetails/${encodeURIComponent(movie.name)}`}
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

export default FilteredMovies2;

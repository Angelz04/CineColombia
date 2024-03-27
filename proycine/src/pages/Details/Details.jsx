import { useState } from 'react';
import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import CardEndpoint from '../../services/CardEndPoint';

const DetailsPage = () => {
  // Obtener datos de películas desde el servicio
  const data = CardEndpoint();

  // Obtener el nombre de la película de la URL
  const movieName = window.location.pathname.split('/').pop();

  // Buscar la película correspondiente por su nombre
  const movie = data.find(movie => movie.name === decodeURIComponent(movieName));

  // Estado para controlar la visualización del modal de video
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <div>
      <Header showFilters={false} />
      <Carousel />

      <div className="flex p-4 md:p-20">
        {/* Mostrar la imagen de la película */}
        <div className="flex-shrink-0 mr-8">
          <img className=" w-50 h-80 object-cover" src={movie ? movie.img : ''} alt={movie ? movie.name : 'Imagen no disponible'} />
        </div>

        {/* Contenedor para el nombre, título en español y detalles de la película */}
        <div className="flex flex-col w-1/3">
          {/* Mostrar el nombre de la película */}
          <h2 className="text-2xl text-gray-500 mb-2">{movie ? movie.name : 'Nombre de la película no disponible'}</h2>

          {/* Mostrar el título en español de la película */}
          <p className="text-lg text-gray-400 mb-2">{movie ? movie.titleSpanish : 'Título en español no disponible'}</p>

          {/* Mostrar los detalles de la película */}
          <div className="flex items-center mb-2">
            {/* Mostrar la B */}
            <div className="bg-gray-800 text-white rounded-md p-3 mr-4">B</div>

            {/* Mostrar la duración de la película */}
            <div className="bg-gray-900 text-white rounded-md p-2 mr-4">{movie ? movie.Duration : 'Duración no disponible'}</div>

            {/* Mostrar el género de la película */}
            <div className="bg-indigo-700 text-white rounded-md p-2">{movie ? movie.Genre : 'Género no disponible'}</div>
          </div>

          {/* Mostrar el modal de video al hacer clic en el botón */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => setShowVideoModal(true)}>Ver Trailer</button>

          {/* Mostrar la sinopsis */}
          <p className="text-gray-600 mt-4 overflow-y-auto">{movie ? movie.Sinopsis : 'Sinopsis no disponible'}</p>
        </div>
      </div>

      {/* Modal de video */}
      {showVideoModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative">
            <button className="absolute top-2 right-2 text-white text-2xl" onClick={() => setShowVideoModal(false)}>X</button>
            <iframe
              width="560"
              height="315"
              src={movie ? `https://www.youtube.com/embed/${movie.Trailer}` : ''}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsPage;

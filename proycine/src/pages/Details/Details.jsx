import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import CardEndpoint from '../../services/CardEndPoint';
import CinemasEndpoint from '../../services/CinemasEndPoint';

const DetailsPage = () => {
  const cardData = CardEndpoint();
  const cinemaData = CinemasEndpoint();
  const [movieName, setMovieName] = useState('');
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [movieSchedule, setMovieSchedule] = useState(null);
  const [selectedButton, setSelectedButton] = useState('');
  const [selectedTime, setSelectedTime] = useState(''); // Nuevo estado para la hora seleccionada
  const navigate = useNavigate();

  useEffect(() => {
    const movieNameFromUrl = window.location.pathname.split('/').pop();
    setMovieName(decodeURIComponent(movieNameFromUrl));
  }, []);

  useEffect(() => {
    if (selectedCinema && selectedDate && cinemaData[selectedCinema] && cinemaData[selectedCinema][selectedDate]) {
      const schedule = cinemaData[selectedCinema][selectedDate].find(movieSchedule => movieSchedule.name === movieName);
      if (schedule) {
        setMovieSchedule(schedule.schedule);
      } else {
        setMovieSchedule(null);
      }
    } else {
      setMovieSchedule(null);
    }
  }, [selectedCinema, selectedDate, movieName, cinemaData]);

  const handleVideoModal = () => {
    setShowVideoModal(true);
  };

  const handleSelectTickets = () => {
    if (selectedButton) {
      navigate(`/tickets/${encodeURIComponent(movieName)}`, { state: { selectedTime } }); // Pasar selectedTime como estado al componente de TicketsPage
    } else {
      alert("Por favor, selecciona un horario primero.");
    }
  };

  return (
    <div>
      <Header 
        showFilters={false} 
        selectedCinema={selectedCinema} 
        selectedDate={selectedDate} 
        setSelectedCinema={setSelectedCinema} 
        setSelectedDate={setSelectedDate} 
        cinemaData={cinemaData} 
      />
      <Carousel />

      <div className="flex flex-wrap p-4 md:p-20 lg:space-x-26">
        <div className="flex-shrink-0 mx-auto mb-4">
          <img className="w-50 h-80 object-cover" src={cardData ? cardData.find(movie => movie.name === movieName)?.img : ''} alt={cardData ? cardData.find(movie => movie.name === movieName)?.name : 'Imagen no disponible'} />
        </div>

        <div className="flex flex-col w-full md:w-1/3">
          <h2 className="text-2xl text-gray-500 mb-2">{cardData ? cardData.find(movie => movie.name === movieName)?.name : 'Nombre de la película no disponible'}</h2>
          <p className="text-lg text-gray-400 mb-2">{cardData ? cardData.find(movie => movie.name === movieName)?.titleSpanish : 'Título en español no disponible'}</p>

          <div className="flex items-center mb-2">
            <div className="bg-gray-900 text-white rounded-md p-2 mr-4">{cardData ? cardData.find(movie => movie.name === movieName)?.Duration : 'Duración no disponible'}</div>
            <div className="bg-indigo-700 text-white rounded-md p-2">{cardData ? cardData.find(movie => movie.name === movieName)?.Genre : 'Género no disponible'}</div>
          </div>

          <button className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm mb-2" onClick={handleVideoModal}>Ver Trailer</button>
          <div className='flex flex-col mt-5'>
            <h2>Sinópsis:</h2>
          <p className="text-gray-600 mt-4 overflow-y-auto">{cardData ? cardData.find(movie => movie.name === movieName)?.Sinopsis : 'Sinopsis no disponible'}</p>
          </div>
        </div>

        <div className="w-full md:w-1/3 mx-auto">
          {movieSchedule && (
            <div>
              <h3 className="text-xl font-bold mb-4">Horarios disponibles {selectedDate}</h3>
              <p className='text-sm font-regular mb-4'>Elige el horario que prefieras</p>
              <p><span className="font-bold"></span> {selectedCinema}</p>
              <div className="flex flex-wrap mt-5">
                {Object.values(movieSchedule).map((schedule, index) => (
                  <button 
                    key={index} 
                    className={`text-${selectedButton === schedule.time ? 'white' : 'gray-700'} border border-gray-300 px-2 py-1 rounded-md mr-2 mb-2 ${selectedButton === schedule.time ? 'bg-gray-500' : 'bg-transparent'}`}
                    onClick={() => { 
                      setSelectedButton(schedule.time);
                      setSelectedTime(schedule.time); // Actualizar selectedTime al hacer clic en un horario
                    }}
                  >
                    {schedule.time}
                  </button>
                ))}
              </div>
              <button 
                className={`px-24 py-2 rounded-md mt-4 ${selectedButton ? 'bg-indigo-700 text-white' : 'bg-gray-500 text-gray-300'}`} 
                onClick={handleSelectTickets}
                disabled={!selectedButton}
              >
                Seleccionar boletos
              </button>
            </div>
          )}
        </div>
      </div>

      {showVideoModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative">
            <button className="absolute top-2 right-2 text-white text-2xl" onClick={() => setShowVideoModal(false)}>X</button>
            <iframe
              width="560"
              height="315"
              src={cardData ? `https://www.youtube.com/embed/${cardData.find(movie => movie.name === movieName)?.Trailer}` : ''}
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

import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import CardEndpoint from "../../services/CardEndPoint";
import CinemasEndpoint from "../../services/CinemasEndPoint";

const QrPage = () => {
  const { nombre } = useParams();
  const { state } = useLocation();
  const cardData = CardEndpoint();
  const selectedMovie = cardData.find(
    (movie) => movie.name === decodeURIComponent(nombre)
  );
  const cinemaData = CinemasEndpoint();
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [randomRoomNumber, setRandomRoomNumber] = useState(0);
  const selectedTime = state ? state.selectedTime : "";
  const selectedSeats = state ? state.selectedSeats : "";
  const navigate = useNavigate();

  useEffect(() => {
    if (state && state.randomRoomNumber) {
      setRandomRoomNumber(state.randomRoomNumber);
    } else {
      const randomRoomNumber = generateRandomRoomNumber();
      setRandomRoomNumber(randomRoomNumber);
    }
  }, [state]);

  useEffect(() => {
    if (state && state.selectedCinema) {
      setSelectedCinema(state.selectedCinema);
    }
  }, [state]);

  const generateRandomRoomNumber = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  const handleContinue = () => {
    navigate("/", {});
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header
        showFilters={false}
        selectedCinema={selectedCinema}
        selectedDate={selectedDate}
        setSelectedCinema={setSelectedCinema}
        setSelectedDate={setSelectedDate}
        cinemaData={cinemaData}
      />
      <Carousel />
      <div className="flex flex-col justify-center items-center mt-10">
      <div className="lg:w-1/2 lg:pr-6 ">
        <div className="flex justify-center items-center">
          <div className="bg-gray-200 max-w-[400px] bg-indigo-950 p-12">
            <div className="flex flex-row space-x-[80px] text-sm text-white">
              <h2 className="font-bold text-xl">Boletos</h2>
              <div className="flex-flex-col">
                <p>
                  Fecha: <span>{selectedDate}</span>
                </p>
                <p>
                  Función: <span>{selectedTime || "Time not selected"}</span>
                </p>
              </div>
            </div>
            <div className="flex flex-col mt-5 pb-2">
              <div className="flex items-center mb-4">
                <img
                  src={selectedMovie?.img}
                  alt={selectedMovie?.name}
                  className="w-[80px] mx-auto"
                />
                <div className="flex flex-col pl-3 text-white">
                  <p>
                    Película: <span>{selectedMovie?.name}</span>
                  </p>
                  <p>
                    Complejo: <span>{selectedCinema}</span>
                  </p>
                  <p>Sala: {randomRoomNumber}</p>
                  <p>Asientos: {selectedSeats}</p>
                </div>
              </div>
            </div>
            <img
              className="w-[130px] mx-auto"
              src="https://cdn.qrplanet.com/proxy/qrcdr/plugins/qr-templates/preview/b5c55b48724f79bdc90093bf6095a3b0.svg"
              alt="qr"
            />
          </div>
        </div>
      </div>
      {/* Botón debajo del div principal */}
      <button
        id="continue-button"
        className="mt-4 mb-4 bg-indigo-500 text-white px-8 py-3 rounded-md mx-auto"
        onClick={handleContinue}
      >
        Volver al Home
      </button>
    </div>
    </div>
  );
};

export default QrPage;

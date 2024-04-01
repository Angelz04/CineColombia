import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import CardEndpoint from "../../services/CardEndPoint";
import CinemasEndpoint from "../../services/CinemasEndPoint";

const Successful = () => {
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
  const totalPrice = state ? state.totalPrice : 0;
  const selectedSeats = state ? state.selectedSeats : "";
  const adultTickets = state ? state.adultTickets : 0;
  const childTickets = state ? state.childTickets : 0;
  const seniorTickets = state ? state.seniorTickets : 0;
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

  const generateRandomCode = () => {
    return Math.floor(Math.random() * 1000000000); 
  };

  const handleContinue = async () => {
    // Datos a enviar
    const data = {
      selectedMovie: {
        name: selectedMovie.name,
      },
      selectedCinema,
      selectedDate,
      selectedTime,
      randomRoomNumber,
      totalPrice,
      selectedSeats,
      adultTickets,
      childTickets,
      seniorTickets,
      cardNumber: getCardNumber(),
      purchaseCode: generateRandomCode()
    };

    try {
      // Realizar solicitud POST al endpoint
      const response = await fetch('http://localhost:3000/compras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Verificar si la solicitud fue exitosa
      if (response.ok) {
        // Redirigir al usuario
        navigate(`/qr/${encodeURIComponent(selectedMovie?.name)}`, {
          state: {
            selectedTime,
            totalPrice,
            randomRoomNumber,
            selectedSeats,
            adultTickets,
            childTickets,
            seniorTickets,
          },
        });
      } else {
        console.error('Error al enviar los datos');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const getCardNumber = () => {
    if (state && state.cardNumber) {
      return state.cardNumber.substring(0, 8);
    }
    return '';
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
      <div className="flex justify-center mt-6">
        <div className=" pl-5 flex bg-white text-white p-5 w-[800px] border border-yellow-950">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="yellow">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-gray-500">¡Transacción Exitosa!</p>
        </div>
      </div>
      <div className="p-5 mb-6 overflow-x-auto ml-5">
        <div className="bg-white p-5 mt-6 flex flex-col space-y-2">
          <div className="flex flex-row mb-5  lg:space-x-[860px]">
            <h2 className="font-bold text-xl">Información de compra</h2>
            <h2 className="text-blue-500 bg-blue-100 px-2">Facturación</h2>
          </div>
          <div className="flex flex-wrap lg:flex-row md:flex-row sm:flex-col">
            <div className="flex flex-col mr-16">
              <p className="pb-2">Código de compra</p>
              <p>#{generateRandomCode()}</p>
            </div>
            <div className="flex flex-col mr-16">
              <p className="pb-2">Fecha</p>
              <p>{selectedDate}</p>
            </div>
            <div className="flex flex-col mr-16">
              <p className="pb-2">Total</p>
              <p>${totalPrice}</p>
            </div>
            <div className="flex flex-col mr-16">
              <p className="pb-2">Método de pago</p>
              <p>Master Card - {getCardNumber()}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:justify-center  lg:flex-row mt-6">
          <div className="lg:w-1/2 lg:pr-6 mb-6 lg:mb-0">
            <div className="flex items-center h-full">
              <div className="lg:pl-6 mt-5 lg:ml-36">
                <div className="bg-gray-200 p-8 max-w-[400px]">
                  <h2 className="font-bold text-xl mb-4">Resumen de compra</h2>
                  <div className="flex flex-col">
                    <div className="flex items-center mb-4">
                      <img
                        src={selectedMovie?.img}
                        alt={selectedMovie?.name}
                        className="w-[110px]"
                      />
                      <div className="flex flex-col pl-3">
                        <p>
                          Película: <span>{selectedMovie?.name}</span>
                        </p>
                        <p>
                          Complejo: <span>{selectedCinema}</span>
                        </p>
                        <p>
                          Fecha: <span>{selectedDate}</span>
                        </p>
                        <p>
                          Función: <span>{selectedTime || "Time not selected"}</span>
                        </p>
                        <p>
                          Sala: {randomRoomNumber}
                        </p>
                        <p>
                          Boletos:{" "}
                          {`${adultTickets > 0 ? `${adultTickets} Adulto,` : ''} ${childTickets > 0 ? `${childTickets} Niños,` : ''} ${seniorTickets > 0 ? `${seniorTickets} Tercera Edad` : ''}`}
                        </p>
                        <p>
                          Asientos: {selectedSeats}
                        </p>
                      </div>
                    </div>
                    <button
                      id="continue-button"
                      className="mt-4 bg-indigo-500 text-white px-8 py-3 rounded-md"
                      onClick={handleContinue}
                    >
                      Continuar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Successful;
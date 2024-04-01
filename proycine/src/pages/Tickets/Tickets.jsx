import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import CardEndpoint from "../../services/CardEndPoint";
import CinemasEndpoint from "../../services/CinemasEndPoint";

const TicketsPage = () => {
  const { nombre } = useParams();
  const { state } = useLocation();
  const cardData = CardEndpoint();
  const selectedMovie = cardData.find(
    (movie) => movie.name === decodeURIComponent(nombre)
  );
  const cinemaData = CinemasEndpoint();
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [adultTicketQuantity, setAdultTicketQuantity] = useState(0);
  const [childTicketQuantity, setChildTicketQuantity] = useState(0);
  const [seniorTicketQuantity, setSeniorTicketQuantity] = useState(0);
  const [totalTicketQuantity, setTotalTicketQuantity] = useState(0);
  const selectedTime = state.selectedTime || '';

  useEffect(() => {
    const totalTickets =
      adultTicketQuantity + childTicketQuantity + seniorTicketQuantity;
    setTotalTicketQuantity(totalTickets);
  }, [adultTicketQuantity, childTicketQuantity, seniorTicketQuantity]);

  const decrementQuantity = (setter) => {
    setter((prevQuantity) => Math.max(0, prevQuantity - 1));
  };

  const incrementQuantity = (setter) => {
    if (totalTicketQuantity < 10) {
      setter((prevQuantity) => Math.min(10, prevQuantity + 1));
    }
  };

  const hasSelectedTickets = totalTicketQuantity > 0;

  const navigate = useNavigate();

  const handleContinue = () => {
    // Lógica para continuar al proceso de compra de boletos
    navigate(`/seats/${encodeURIComponent(selectedMovie?.name)}`, {
      state: {
        totalTickets: totalTicketQuantity,
        totalPrice:
          adultTicketQuantity * 71 +
          childTicketQuantity * 56 +
          seniorTicketQuantity * 56,
          selectedTime,
          adultTickets: adultTicketQuantity,
        childTickets: childTicketQuantity,
        seniorTickets: seniorTicketQuantity
      },
    });
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

      <div className="flex flex-wrap p-6  lg:space-x-36 justify-center">
        <div className="tickets-section mb-6">
          <h1 className="text-2xl font-semibold">Selecciona tus boletos</h1>
          <p className="text-gray-600 mb-4">
            Puede comprar hasta 10 boletos por transacción.
          </p>
          <div className="ticket-info flex items-center mb-4  sm:w-[490px] sm:min-w-[300px]">
            <div className="flex-grow">
              <div className="ticket-type">Adulto</div>
              <div className="ticket-price">$71</div>
            </div>
            <div className="quantity-controls flex items-center">
              <button
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md border border-gray-400"
                onClick={() => decrementQuantity(setAdultTicketQuantity)}
              >
                -
              </button>
              <span className="mx-3">{adultTicketQuantity}</span>
              <button
                className="bg-indigo-500 text-white px-3 py-1 rounded-md border border-gray-400"
                onClick={() => incrementQuantity(setAdultTicketQuantity)}
              >
                +
              </button>
            </div>
          </div>

          <div className="ticket-info flex items-center mb-4  sm:w-[490px] sm:min-w-[300px]">
            <div className="flex-grow">
              <div className="ticket-type">Niños</div>
              <div className="ticket-price">$56</div>
            </div>
            <div className="quantity-controls flex items-center">
              <button
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md border border-gray-400"
                onClick={() => decrementQuantity(setChildTicketQuantity)}
              >
                -
              </button>
              <span className="mx-3">{childTicketQuantity}</span>
              <button
                className="bg-indigo-500 text-white px-3 py-1 rounded-md border border-gray-400"
                onClick={() => incrementQuantity(setChildTicketQuantity)}
              >
                +
              </button>
            </div>
          </div>

          <div className="ticket-info flex items-center mb-4  sm:w-[490px] sm:min-w-[300px]">
            <div className="flex-grow">
              <div className="ticket-type">Tercera Edad</div>
              <div className="ticket-price">$56</div>
            </div>
            <div className="quantity-controls flex items-center">
              <button
                className="bg-gray-300 text-gray-800 px-3 py-1 rounded-md border border-gray-400"
                onClick={() => decrementQuantity(setSeniorTicketQuantity)}
              >
                -
              </button>
              <span className="mx-3">{seniorTicketQuantity}</span>
              <button
                className="bg-indigo-500 text-white px-3 py-1 rounded-md border border-gray-400"
                onClick={() => incrementQuantity(setSeniorTicketQuantity)}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="summary-section bg-gray-200 p-5 mb-6 max-w-[400px]">
          <h2 className="font-bold mb-4 text-xl">Resumen de compra</h2>
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
                  Función:{" "}
                  <span>{state?.selectedTime || "Hora no seleccionada"}</span>
                </p>
              </div>
            </div>
            <p className="mt-4 mb-4">
              Se realizará un cargo por servicio por cada boleta dentro de la orden.
            </p>
            <div className="flex justify-between w-full">
              <p className="font-bold mt-2">Total (IVA incluido):</p>
              <p className="font-bold">
                ${adultTicketQuantity * 71 +
                  childTicketQuantity * 56 +
                  seniorTicketQuantity * 56}
              </p>
            </div>
          </div>
          {/* Botón de Continuar */}
          <div className="text-center">
            <button
              disabled={!hasSelectedTickets}
              className={` mt-4 mb-6 ${
                hasSelectedTickets ? "bg-indigo-500" : "bg-gray-400"
              } text-white px-8 sm:px-32 py-3 rounded-md`}
              onClick={handleContinue}
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketsPage;

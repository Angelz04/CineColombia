import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import CardEndpoint from "../../services/CardEndPoint";
import CinemasEndpoint from "../../services/CinemasEndPoint";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch } from "@fortawesome/free-solid-svg-icons";

const Seats = () => {
  const { nombre } = useParams();
  const { state } = useLocation();
  const cardData = CardEndpoint();
  const selectedMovie = cardData.find(
    (movie) => movie.name === decodeURIComponent(nombre)
  );
  const cinemaData = CinemasEndpoint();
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [totalTicketsFromTicketsPage, setTotalTicketsFromTicketsPage] = useState(0);
  const [adultTicketQuantity, setAdultTicketQuantity] = useState(0);
  const [childTicketQuantity, setChildTicketQuantity] = useState(0);
  const [seniorTicketQuantity, setSeniorTicketQuantity] = useState(0);
  const [randomRoomNumber, setRandomRoomNumber] = useState(0); // Número de sala aleatorio
  const selectedTime = state.selectedTime || "";
  const navigate = useNavigate();

  useEffect(() => {
    if (state.totalTickets) {
      setTotalTicketsFromTicketsPage(state.totalTickets);
      setAdultTicketQuantity(state.adultTickets || 0);
      setChildTicketQuantity(state.childTickets || 0);
      setSeniorTicketQuantity(state.seniorTickets || 0);
    }
    const randomOccupiedSeats = generateRandomSeats();
    setOccupiedSeats(randomOccupiedSeats);
    setRandomRoomNumber(generateRandomRoomNumber());
  }, [state]);

  useEffect(() => {
    const randomOccupiedSeats = generateRandomSeats();
    setOccupiedSeats(randomOccupiedSeats);
    setRandomRoomNumber(generateRandomRoomNumber());
  }, []);

  useEffect(() => {
    // Verificar si todas las seats necesarias han sido seleccionadas
    const allSeatsSelected = selectedSeats.length === totalTicketsFromTicketsPage;
    const button = document.getElementById("continue-button");
    if (button) {
      button.disabled = !allSeatsSelected; // Deshabilitar el botón si no todas las seats están seleccionadas
      button.style.backgroundColor = allSeatsSelected ? '#4F46E5' : '#CBD5E0'; // Cambiar color del fondo del botón
    }
  }, [selectedSeats, totalTicketsFromTicketsPage]);

  const generateRandomSeats = () => {
    const occupiedSeats = [];
    const numRows = 10;
    const numSeatsPerRow = 14;
    const numSeats = numRows * numSeatsPerRow;

    for (let i = 0; i < 30; i++) {
      const randomSeatIndex = Math.floor(Math.random() * numSeats);
      occupiedSeats.push(randomSeatIndex);
    }

    return occupiedSeats;
  };

  const generateRandomRoomNumber = () => {
    return Math.floor(Math.random() * 5) + 1; // Generar un número aleatorio entre 1 y 5
  };

  const handleSeatSelection = (row, seatNumber) => {
    const selectedSeat = `${String.fromCharCode(65 + row)}${seatNumber}`;

    if (selectedSeats.includes(selectedSeat)) {
      const updatedSelectedSeats = selectedSeats.filter(
        (seat) => seat !== selectedSeat
      );
      setSelectedSeats(updatedSelectedSeats);
    } else {
      if (selectedSeats.length >= totalTicketsFromTicketsPage) {
        const firstSelectedSeat = selectedSeats[0];
        const updatedSelectedSeats = selectedSeats.filter(
          (seat) => seat !== firstSelectedSeat
        );
        setSelectedSeats([...updatedSelectedSeats, selectedSeat]);
      } else {
        setSelectedSeats([...selectedSeats, selectedSeat]);
      }
    }
  };

  const isSeatSelected = (row, seatNumber) => {
    return selectedSeats.includes(
      `${String.fromCharCode(65 + row)}${seatNumber}`
    );
  };

  const isSeatOccupied = (row, seatNumber) => {
    return occupiedSeats.includes((row - 1) * 14 + seatNumber);
  };

  const getSeatColor = (row, seatNumber) => {
    if (isSeatSelected(row, seatNumber)) {
      return "text-yellow-400";
    } else if (isSeatOccupied(row, seatNumber)) {
      return "text-red-400";
    } else {
      return "text-blue-400";
    }
  };

  const handleContinue = () => {
    navigate(`/payment/${encodeURIComponent(selectedMovie?.name)}`, {
      state: {
        selectedTime,
        selectedSeats: selectedSeats.join(", "),
        totalPrice: calculateTotalPrice(),
        randomRoomNumber, // Pasa el número de sala aquí
        adultTickets: adultTicketQuantity,
        childTickets: childTicketQuantity,
        seniorTickets: seniorTicketQuantity
      },
    });
  };

  const calculateTotalPrice = () => {
    return adultTicketQuantity * 71 + childTicketQuantity * 56 + seniorTicketQuantity * 56;
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

      <div className="p-5 mb-6 overflow-x-auto ml-5">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 lg:pr-6 mb-6 lg:mb-0">
            <h2 className="font-base mb-4 text-xl text-center lg:text-left">Selecciona tus Asientos</h2>
            <p className="text-center lg:text-left">Para cambiar tu lugar asignado da click en el asiendo deseado.</p>
            <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-start mt-5 mb-10">
              <span className="mr-5 ml-5 mb-2">
                <FontAwesomeIcon icon={faCouch} className={"text-yellow-400 text-[26px] sm:text-[18px]"}></FontAwesomeIcon>
              </span> Seleccionado
              <span className="ml-5 mr-5 mb-2">
                <FontAwesomeIcon icon={faCouch} className={"text-red-400 text-[26px] sm:text-[18px]"}></FontAwesomeIcon>
              </span> Ocupado
              <span className="ml-5 mr-5 mb-2">
                <FontAwesomeIcon icon={faCouch} className={"text-blue-400 text-[26px] sm:text-[18px]"}></FontAwesomeIcon>
              </span> Disponible
            </div>
            <div className="flex flex-col items-center lg:items-start">
              {Array.from({ length: 10 }, (_, row) => (
                <div key={row} className="flex items-center mb-2 ">
                  <span className="mr-2 font-bold text-lg w-[32px]">
                    {String.fromCharCode(65 + row)}
                  </span>
                  <div className="flex flex-wrap">
                    {Array.from({ length: 14 }, (_, index) => {
                      const seatNumber = index + 1;
                      const shouldAddSpace = seatNumber === 8 && index !== 0; // Añadir espacio entre la silla 7 y la 8
                      return (
                        <>
                          {shouldAddSpace && <div className="hidden lg:block" style={{ width: "48px" }} />}
                          <button
                            key={index}
                            className="w-8 h-8 rounded-full mr-2 flex items-center justify-center text-white text-[16px] relative"
                            onClick={() => handleSeatSelection(row, index + 1)}
                            disabled={isSeatOccupied(row, index + 1)}
                          >
                            <FontAwesomeIcon
                              icon={faCouch}
                              className={`text-[24px] ${getSeatColor(
                                row,
                                index + 1
                              )}`}
                            />
                            <span className="absolute">{index + 1}</span>
                          </button>
                        </>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center h-full">
            <div className=" lg:pl-6 mt-32 lg:ml-36">
              <div className="bg-gray-200 p-5 max-w-[400px]">
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
                        Función: <span>{state?.selectedTime || "Time not selected"}</span>
                      </p>
                      <p>
                        Boletos:{" "}
                        {`${adultTicketQuantity > 0 ? `${adultTicketQuantity} Adulto,` : ''} ${childTicketQuantity > 0 ? `${childTicketQuantity} Niños,` : ''} ${seniorTicketQuantity > 0 ? `${seniorTicketQuantity} Tercera Edad` : ''}`}
                      </p>
                      <p>
                        Sala: {randomRoomNumber}
                      </p>
                      <p>
                        Asientos: {selectedSeats.join(", ")}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 mb-4">
                    Se realizará un cargo por servicio por cada boleta dentro de la orden.
                  </p>
                  <div className="flex justify-between w-full">
                    <p className="font-bold mt-2">Total (Iva incluido):</p>
                    <p className="font-bold">${calculateTotalPrice()}</p>
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
  );
};

export default Seats;

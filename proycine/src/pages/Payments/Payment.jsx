import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Carousel from "../../components/Carousel";
import CardEndpoint from "../../services/CardEndPoint";
import CinemasEndpoint from "../../services/CinemasEndPoint";

const Payment = () => {
  const { nombre } = useParams();
  const { state } = useLocation();
  const cardData = CardEndpoint();
  const selectedMovie = cardData.find(
    (movie) => movie.name === decodeURIComponent(nombre)
  );
  const cinemaData = CinemasEndpoint();
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const totalPrice = state.totalPrice || 0;
  const selectedTime = state.selectedTime || "";
  const selectedSeats = state.selectedSeats || "";
  const adultTickets = state.adultTickets || 0;
  const childTickets = state.childTickets || 0;
  const seniorTickets = state.seniorTickets || 0;
  const randomRoomNumber = state.randomRoomNumber || 0; // Obtener el número de sala seleccionado de la ubicación
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "expiryDate" && value.length === 2 && !value.includes("/")) {
      // Automatically add a slash after entering two digits for expiry date
      formattedValue = value + "/";
    }

    if (name === "cardName") {
      // Remove any digits from the card name
      formattedValue = value.replace(/\d/g, "");
    }

    if (name === "cardNumber") {
      // Remove any non-numeric characters from the card number
      formattedValue = value.replace(/\D/g, "").slice(0, 19); // Limit to 19 characters (16 digits + 3 spaces)
      // Add spaces every 4 digits for visual formatting
      formattedValue = formattedValue.replace(/(.{4})/g, "$1 ").trim();
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  useEffect(() => {
    // Validate form fields to enable/disable the continue button
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const isValidCardName = /^[a-zA-Z\s]+$/.test(formData.cardName);
    const isValidCardNumber = /^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""));
    const isValidExpiryDate = /^\d{2}\/\d{2}$/.test(formData.expiryDate);
    const isValidCVV = /^\d{3}$/.test(formData.cvv);

    setIsButtonDisabled(
      !isValidEmail ||
      !isValidCardName ||
      !isValidCardNumber ||
      !isValidExpiryDate ||
      !isValidCVV
    );
  }, [formData]);

  const handleContinue = () => {
    if (
      !formData.email ||
      !formData.cardName ||
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvv
    ) {
      alert("Por favor completa todos los campos del formulario.");
      return;
    }
  
    navigate(`/successful/${encodeURIComponent(selectedMovie?.name)}`, {
      state: {
        selectedTime,
        totalPrice,
        randomRoomNumber,
        selectedSeats,
        adultTickets,
        childTickets,
        seniorTickets,
        cardNumber: formData.cardNumber // Pasar los primeros ocho dígitos de la tarjeta
      },
    });
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

      <div className="p-5 mb-6 overflow-x-auto ml-5">
        <div className="flex flex-col lg:flex-row">
          <div className="p-5 max-w-[400px] mx-auto mt-8">
            <h2 className="font-bold mb-4 text-xl">Información Personal</h2>
            <p className="mb-4">Completa los datos del formulario para realizar el pago:</p>
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 text-gray-700">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example123@gmail.com"
                  className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
                  value={formData.email}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="cardName" className="mb-1 text-gray-700">
                  Nombre en la Tarjeta
                </label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  placeholder="Pepito Perez"
                  className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
                  value={formData.cardName}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="cardNumber" className="mb-1 text-gray-700">
                  Número de la Tarjeta
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 1234 1234 1234"
                  maxLength="19"
                  className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
                  value={formData.cardNumber}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex flex-col flex-1">
                  <label htmlFor="expiryDate" className="mb-1 text-gray-700">
                    Fecha de Caducidad
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    maxLength="5"
                    className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
                    value={formData.expiryDate}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label htmlFor="cvv" className="mb-1 text-gray-700">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    maxLength="3"
                    className="px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
                    value={formData.cvv}
                    onChange={handleFormChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center h-full">
            <div className="lg:pl-6 mt-16 lg:ml-36 lg:mr-32">
              <div className="p-5 max-w-[400px]">
                <h2 className="font-bold mb-4 text-xl">Purchase Summary</h2>
                <div className="flex flex-col">
                  <div className="flex items-center mb-4">
                    <img
                      src={selectedMovie?.img}
                      alt={selectedMovie?.name}
                      className="w-[110px]"
                    />
                    <div className="flex flex-col pl-3">
                      <p>
                        Movie: <span>{selectedMovie?.name}</span>
                      </p>
                      <p>
                        Cinema: <span>{selectedCinema}</span>
                      </p>
                      <p>
                        Date: <span>{selectedDate}</span>
                      </p>
                      <p>
                        Time: <span>{selectedTime || "Time not selected"}</span>
                      </p>
                      <p>
                        Boletos:{" "}
                        {`${adultTickets > 0 ? `${adultTickets} Adulto,` : ""} ${
                          childTickets > 0 ? `${childTickets} Niños,` : ""
                        } ${seniorTickets > 0 ? `${seniorTickets} Tercera Edad` : ""}`}
                      </p>
                      <p>
                        Sala: {randomRoomNumber} {/* Mostrar el número de sala seleccionado */}
                      </p>
                      <p>
                        Seats: <span>{selectedSeats}</span>
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 mb-4">
                    Se realizará un cargo por servicio por cada boleta dentro de la orden.
                  </p>
                  <div className="flex justify-between w-full">
                    <p className="font-bold mt-2">Total (Iva incluido):</p>
                    <p className="font-bold">${totalPrice}</p>
                  </div>
                  <button
                    className={`mt-4 text-white px-8 py-3 rounded-md ${
                      isButtonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
                    }`}
                    onClick={handleContinue}
                    disabled={isButtonDisabled}
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

export default Payment;

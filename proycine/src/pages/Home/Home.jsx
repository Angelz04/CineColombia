import { useState } from 'react';
import Header from '../../components/Header';
import Carousel from '../../components/Carousel'; 
import CardList from '../../components/CardList';

const Home = () => {
  // Estados para los filtros
  const [selectedCinema, setSelectedCinema] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isFiltersValid, setIsFiltersValid] = useState(false); // Estado para rastrear si los filtros son válidos

  // Funciones para actualizar los filtros
  const handleSelectedCinemaChange = (cinema) => {
    setSelectedCinema(cinema);
    validateFilters(cinema, selectedDate);
  };

  const handleSelectedDateChange = (date) => {
    setSelectedDate(date);
    validateFilters(selectedCinema, date);
  };

  // Función para validar los filtros
  const validateFilters = (cinema, date) => {
    // Validar si ambos filtros están seleccionados
    if (cinema !== '' && date !== '') {
      setIsFiltersValid(true);
    } else {
      setIsFiltersValid(false);
    }
  };

  return (
    <div>
      <Header 
        showFilters={true} 
        selectedCinema={selectedCinema} 
        selectedDate={selectedDate} 
        setSelectedCinema={handleSelectedCinemaChange} 
        setSelectedDate={handleSelectedDateChange} 
      />
      <Carousel />
      <CardList selectedCinema={selectedCinema} selectedDate={selectedDate} isFiltersValid={isFiltersValid} />
    </div>
  );
};

export default Home;

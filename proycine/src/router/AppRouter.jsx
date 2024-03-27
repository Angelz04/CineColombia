import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import FilteredMovies from '../components/FiltredMovies';
import DetailsPage from '../pages/Details/Details'; // Importa la página de detalles

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:genre" element={<FilteredMovies />} /> {/* Ruta para páginas filtradas */}
        <Route path="/details/:nombre" element={<DetailsPage />} /> {/* Ruta para la página de detalles */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

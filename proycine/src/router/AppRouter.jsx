import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import FilteredMovies from '../components/FiltredMovies';
import DetailsPage from '../pages/Details/Details';
import TicketsPage from '../pages/Tickets/Tickets';
import Seats from '../pages/Seats/Seats';
import Payment from '../pages/Payments/Payment';
import Successful from '../pages/Successful/Successful';
import QrPage from '../pages/Qr/Qr'; // Importa la página Qr
import AdminHome from '../pages/AdminHome/AdminHome';
import FilteredMovies2 from '../components/FiltredMovies2';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:genre" element={<FilteredMovies />} />
        <Route path="/details/:nombre" element={<DetailsPage />} />
        <Route path="/tickets/:nombre" element={<TicketsPage />} />
        <Route path="/seats/:nombre" element={<Seats />} />
        <Route path="/payment/:nombre" element={<Payment />} />
        <Route path="/successful/:nombre" element={<Successful />} />
        <Route path="/qr/:nombre" element={<QrPage />} /> 
        <Route path="/adminHome" element={<AdminHome/>} /> 
        <Route path="/movies2/:genre" element={<FilteredMovies2 />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;

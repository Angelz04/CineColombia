import { Link } from 'react-router-dom';
import UsersEndpoint from '../services/UsersEndpoint';

const Header2 = () => {
  const users = UsersEndpoint(); // Obtener datos de usuarios

  // Función para cerrar sesión
  const handleLogout = () => {
    const confirmLogout = window.confirm('¿Desea cerrar sesión?');
    if (confirmLogout) {
      // Redirigir al usuario al inicio de sesión u otra página de inicio
      window.location.href = '/'; // Redireccionar al home
    }
  };

  // Función para manejar el filtro por género
  const handleGenreFilter = (genre) => {
    // Implementa tu lógica de filtro aquí
    console.log(`Filtrando por género: ${genre}`);
  };

  return (
    <header className="bg-black text-white py-10 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center fixed top-0 w-full z-10">
      <div className="flex items-center flex-shrink-0 mb-2 sm:mb-0 ml-12">
        <Link to="/adminHome">
          <img src="https://archivos.cinecolombia.com/cineco-cms-frontend/1.0.119/dist/images/logo_cineco.svg" alt="Logo" className="h-6 w-auto mt-2 sm:h-8 sm:w-auto" />
        </Link>
      </div>
      <div className="hidden lg:flex justify-center space-x-2 md:space-x-4 mb-4 md:mb-0 mt-2 sm:mt-0">
        <button onClick={() => handleGenreFilter('Acción')} className={`bg-blue-500 text-white px-2 py-1 sm:px-6 py-2 rounded-full`}>Acción</button>
        <button onClick={() => handleGenreFilter('Terror')} className={`bg-blue-500 text-white px-2 py-1 sm:px-6 py-2 rounded-full`}>Terror</button>
        <button onClick={() => handleGenreFilter('Ciencia Ficción')} className={`bg-blue-500 text-white px-2 py-1 sm:px-6 py-2 rounded-full`}>Ciencia Ficción</button>
        <button onClick={() => handleGenreFilter('Comedia')} className={`bg-blue-500 text-white px-2 py-1 sm:px-6 py-2 rounded-full`}>Comedia</button>
      </div>
      <div className="flex items-center space-x-4 mr-12">
        {/* Mostrar la foto y el nombre del usuario */}
        {users.map(user => (
          <div key={user.id} className="flex items-center space-x-2">
            <img src={user.photo} alt="User" className="h-8 w-10 rounded-full" />
            <div className="flex flex-col">
            <span>{user.name}</span>
            <p className='text-white text-xs'>Ver perfil</p> 
            </div>
          </div>
        ))}
        <div>
          {/* Botón para cerrar sesión */}
          <button onClick={handleLogout} className="text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header2;

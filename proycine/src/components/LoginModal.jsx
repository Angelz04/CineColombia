import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import UsersEndPoint from '../services/UsersEndpoint';

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const users = UsersEndPoint();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      onClose();
      navigate('/adminHome');
    } else {
      console.log('Credenciales incorrectas');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96 text-black relative">
        <button className="absolute top-0 right-0 mt-2 mr-2 text-gray-400" onClick={onClose}>
          ❌
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Bienvenido</h2>
        <p className="mb-4 text-center">Inicia Sesión</p>
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold mb-1">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 w-full focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-semibold mb-1">Contraseña</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-2 py-1 w-full focus:outline-none pr-10"
            />
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-400 focus:outline-none"
              onClick={handleShowPassword}
            >
              {showPassword ? "👁️" : "👁️‍🗨️"}
            </button>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-center">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            className="mr-2"
          />
          <label htmlFor="rememberMe">Recordarme</label>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none w-full"
          onClick={handleLogin}
          disabled={!email || !password} // Deshabilitar el botón si no hay correo o contraseña
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
};

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;

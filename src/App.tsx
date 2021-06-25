import React from 'react';
import Modal from 'react-modal';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './hooks/authContext';

import Routes from './routes';

import { GlobalStyle } from './styles/global';

Modal.setAppElement('#root');

const contextClass = {
  success: 'bg-blue-600',
  error: 'bg-red-600',
  info: 'bg-gray-600',
  warning: 'bg-orange-400',
  default: 'bg-indigo-600',
  dark: 'bg-white-600 font-gray-300',
};

const App: React.FC = () => {
  return (
    // <div className="App">
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <Routes />
        <ToastContainer autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;

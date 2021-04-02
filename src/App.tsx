import React from 'react';
import { Dashboard } from './pages/Dashboard';

import { GlobalStyle } from './styles/global';

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <Dashboard />
    </div>
  );
};

export default App;

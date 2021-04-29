import React from 'react';
// import { Classes } from './pages/Classes';
import { Classes } from './pages/Classes_new';

import { GlobalStyle } from './styles/global';

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <Classes />
    </div>
  );
};

export default App;

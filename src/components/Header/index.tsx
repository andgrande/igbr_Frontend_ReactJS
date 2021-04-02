import React from 'react';
import LogoImg from '../../assets/Logo.jpeg';

import { MainHeader } from './styles';

const Header: React.FC = () => {
  return (
    <MainHeader>
      <div>
        <img src={LogoImg} alt="Ingles para Brasileiras" />
        <h1>Inglês para Brasileiras</h1>
      </div>
      {/* <div>
        <a href="/">Classes</a>
        <a href="/">Student</a>
        <a href="/">Teacher</a>
      </div> */}
    </MainHeader>
  );
};

export { Header };

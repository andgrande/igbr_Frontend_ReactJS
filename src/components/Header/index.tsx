import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '../../assets/Logo.jpeg';

import { MainHeader, URLs } from './styles';

const Header: React.FC = () => {
  return (
    <MainHeader>
      <div>
        <img src={LogoImg} alt="Ingles para Brasileiras" />
        <h1>Inglês para Brasileiras</h1>
      </div>
      <URLs>
        <Link to="/">
          <span>Classes</span>
        </Link>
        <Link to="/students">
          <span>Student</span>
        </Link>

        <Link to="/teachers">
          <span>Teacher</span>
        </Link>
      </URLs>
    </MainHeader>
  );
};

export { Header };

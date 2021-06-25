import React from 'react';
import { Link } from 'react-router-dom';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { useAuth } from '../../hooks/authContext';
import LogoImg from '../../assets/Logo.jpeg';

import { MainHeader, HeaderOptions, URLs, Logout } from './styles';

type MenuOptions = {
  omitMenu?: boolean;
};

const Header: React.FC<MenuOptions> = ({ omitMenu }) => {
  const { signOut } = useAuth();

  const handleLogout = () => signOut();

  return (
    <MainHeader>
      <div>
        <img src={LogoImg} alt="Ingles para Brasileiras" />
        <h1>Inglês para Brasileiras</h1>
      </div>

      {!omitMenu && (
        <HeaderOptions>
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

          <Logout>
            <button type="button" onClick={() => handleLogout()}>
              <RiLogoutCircleRLine />
              Logout
            </button>
          </Logout>
        </HeaderOptions>
      )}
    </MainHeader>
  );
};

export { Header };

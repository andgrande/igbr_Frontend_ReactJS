import styled from 'styled-components';

export const MainHeader = styled.header`
  background-color: var(--dark-background);
  height: 7rem;

  padding: 1rem;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* width: 100%; */

    img {
      height: 5rem;
      width: 5rem;
      border-radius: 20%;
    }

    h1 {
      margin-left: 1rem;
      color: #ffffff;
    }
  }

  span {
    font-size: 1.2rem;
  }
`;

export const HeaderOptions = styled.div``;

export const URLs = styled.div`
  a {
    text-decoration: none;
    border: 0rem;
    margin-left: 1rem;

    color: #ffffff;
    transition: transform 0.1s;

    :hover {
      transform: scale(1.1, 1.1);
    }
  }
`;

export const Logout = styled.div`
  margin-left: 10em;
  right: 0;

  button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    background: none;
    text-decoration: none;
    font-size: 1.1rem;
    border: 0rem;
    border-radius: 0.5em;
    height: 2em;
    width: 5em;
    margin-left: 1rem;

    color: #ffffff;
    transition: transform 0.1s;

    :hover {
      transform: scale(1.1, 1.1);
    }
  }
`;

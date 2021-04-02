import styled from 'styled-components';

export const MainHeader = styled.header`
  background-color: var(--header);
  height: 7rem;

  padding: 1rem;

  display: flex;
  justify-content: space-evenly;
  align-items: center;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;

    img {
      height: 5rem;
      width: 5rem;
      border-radius: 20%;
    }

    h1 {
      margin-left: 1rem;
      color: #ffffff;
    }

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
  }
`;

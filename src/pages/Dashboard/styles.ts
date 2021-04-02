import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  margin-top: 2rem;

  color: var(--light);
`;

export const Classes = styled.div`
  border: 0.1rem;
  border-color: #ccc;

  margin-top: 2rem;
  max-width: 80rem;

  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-content: center;
`;

export const Class = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  background: var(--light);
  height: 10rem;
  width: 30rem;
  margin: 1rem;
  border: 1rem;
  border-color: #000;
  border-radius: 0.4rem;
  padding: 0.5rem;

  color: var(--text-title);

  transition: all 0.3s;

  :hover {
    opacity: 0.7;
  }

  :focus {
    /* text-decoration: none; */
    /* border: 0; */
    outline: 0;
  }
`;

export const TempModal = styled.div`
  content: {
    top: '50%';
    left: '50%';
    right: 'auto';
    bottom: 'auto';
    margin-right: '-50%';
    transform: 'translate(-50%, -50%)';
    background: '#F0F0F5';
    color: '#000000';
    border-radius: '8px';
    width: '736px';
    border: 'none';
  }
  overlay: {
    background-color: '#121214e6';
  }
`;

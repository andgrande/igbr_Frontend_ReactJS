import styled from 'styled-components';

export const ClassInfo = styled.div`
  margin-left: 2rem;
  padding: 1rem;
  background-color: var(--light);
  border-radius: 1rem;
`;

export const Timetable = styled.div`
  margin-left: 2rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  background-color: var(--light);
  border-radius: 1rem;
`;

export const ClassDateSubHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-left: 2rem;
  margin-bottom: 0.5rem;

  span {
    padding: 1rem;
    background-color: var(--light);
    border-radius: 1rem;
  }
`;

export const ModalHeader = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
`;

export const ModalHeaderButtons = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
`;

export const ReturnModalButton = styled.button`
  margin-right: 1rem;
  height: 4rem;
  width: 6rem;
  background-color: var(--light);
  border-radius: 1rem;
  border-width: 1px;
  opacity: 1;
`;

export const CloseModalButton = styled.button`
  height: 4rem;
  width: 6rem;
  background-color: var(--header);
  border-radius: 1rem;
  border-width: 1px;
  opacity: 1;
`;

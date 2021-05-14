import styled, { css } from 'styled-components';

interface ClassStatus {
  status?: 'given | pending' | null | undefined | string;
}

interface ClassGiven {
  status?: 'given | pending' | null | undefined | string;
}

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;

  margin: 0 2rem 0;

  color: var(--light);
`;

export const ClassList = styled.aside`
  background-color: var(--semi-light);
  width: 25vw;

  height: 75vh;
  overflow: auto;

  border: 0.1rem;
  border-radius: 0.5rem;
  border-color: #ccc;

  /* margin-top: 1rem; */
  /* padding-top: 1rem; */
  max-width: 80rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;

  input {
    width: 20rem;
    margin: 1rem 1rem 0 1rem;
  }
`;

export const ClassDetails = styled.div`
  /* background-color: var(--semi-light); */
  background-color: var(--trial-light);
  width: 70vw;

  height: 75vh;
  overflow: auto;

  border: 0.1rem;
  border-radius: 0.5rem;
  border-color: #ccc;

  margin-left: 2rem;
  padding: 1rem;
  max-width: 80rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;

  h1,
  h4 {
    color: var(--trial-text-title);
  }
`;

export const Class = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  background: var(--light);
  height: 10rem;
  width: 20rem;
  margin: 1rem;
  border: 1rem;
  border-color: #000;
  border-radius: 0.4rem;
  padding: 0.5rem;

  color: var(--text-title);

  transition: all 0.1s;

  :hover {
    opacity: 0.7;
    transform: scale(1.05, 1.05);
  }

  :focus {
    /* text-decoration: none; */
    /* border: 0; */
    outline: 0;
  }
`;

export const TempDetails = styled.div`
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

export const DetailsHeader = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
`;

export const DetailsButtons = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: center;
`;

export const ManageStudentsButton = styled.button`
  display: flex;
  /* justify-content: right; */
  align-items: center;
  height: 4rem;
  width: 6rem;
  background-color: var(--header);
  border-radius: 1rem;
  border-width: 1px;
  opacity: 1;
`;

export const CloseDetailsButton = styled.button`
  height: 4rem;
  width: 6rem;
  background-color: var(--header);
  border-radius: 1rem;
  border-width: 1px;
  opacity: 1;
`;

export const ClassInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 2rem;
  margin-bottom: 1em;
  padding: 1rem;
  background-color: var(--light);
  border-radius: 1rem;
  color: var(--text-body);
`;

export const Individuals = styled.div``;

export const Timetable = styled.div<ClassGiven>`
  margin-left: 2rem;
  margin-bottom: 0.5rem;
  padding: 1rem;
  background-color: var(--light);
  border-radius: 1rem;
  color: var(--text-body);

  ${props =>
    props.status === 'given' &&
    css`
      background-color: var(--green);
    `}
`;

export const ClassStudentSubHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 0.5em;
`;

export const ClassDateSubHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 1em 0 0.5em 2em;
  /* margin-left: 2rem; */
  /* margin-bottom: 0.5rem; */
`;

export const ClassDateSubHeaderSpan = styled.span<ClassStatus>`
  height: 4rem;
  width: 8rem;
  padding: 1rem;
  background-color: var(--light);
  border-radius: 1rem;
  color: var(--text-body);

  ${props =>
    props.status === 'given' &&
    css`
      background-color: var(--green);
    `}

  ${props =>
    props.status === 'pending' &&
    css`
      background-color: var(--orange);
    `}
`;

export const ClassDateSubHeaderButton = styled.button<ClassStatus>`
  height: 4rem;
  width: 6rem;
  padding: 1rem;
  background-color: var(--light);
  border-radius: 1rem;
  color: var(--text-body);

  ${props =>
    props.status === 'given' &&
    css`
      background-color: var(--green);
    `}

  ${props =>
    props.status === 'pending' &&
    css`
      background-color: var(--orange);
    `}
`;

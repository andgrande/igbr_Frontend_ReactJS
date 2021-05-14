import styled, { css } from 'styled-components';

interface SearchVisibility {
  fieldsHidden: boolean;
}

// interface SearchButtonVisibility {
//   buttonHidden: boolean;
// }

export const PageSubHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;

  margin: 0 2rem 0;

  color: var(--light);

  svg {
    background-color: none;
    width: 20px;
    height: 20px;
    margin-right: 1em;
  }
`;

export const SubHeaderTitle = styled.h1`
  /* min-width: 50%; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  width: 70vw;
`;

export const Search = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SearchTool = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 25vw;
  padding: 1em;

  button {
    /* background: none; */

    width: 10vw;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.5em;
    margin: auto 1em;

    span {
      display: flex;
      justify-content: center;
      align-items: center;
    }

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
  }
`;

export const SearchFields = styled.span<SearchVisibility>`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: 'flex';
    flex-wrap: 'wrap';
    flex-direction: 'column';
    margin-top: '1em';
    padding-bottom: '1em';
    align-items: 'center';
  }

  input {
    margin-left: 1em;
  }

  span {
    margin-bottom: 0.1em;
  }

  /* transition: hidden 0s linear 300ms, opacity 300ms;

  ${props =>
    props.fieldsHidden
      ? css`
          transition: hidden 0s linear 300ms, opacity 300ms;
          background-color: var(--green);
        `
      : css`
          transition: hidden 0s linear 300ms, opacity 300ms;
          background-color: #000;
        `} */
`;

export const SearchButton = styled.button``;

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

import styled from 'styled-components';

export const Toggle = styled.label`
  position: relative;
  /* display: inline-block; */
  display: flex;
  align-items: center;
  height: 4rem;
  width: 7rem;

  input {
    opacity: 0;
    width: 0;
    height: 0;
    /* background-color: var(--midnight); */
  }

  span {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--midnight);
    -webkit-transition: 0.4s;
    /* transition: 0.4s; */
    transition: all 0.5s ease;
  }

  span:before {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    content: 'on hold';
    height: 3.5em;
    width: 3em;
    left: 5px;
    bottom: 4px;
    background-color: var(--night);
    -webkit-transition: 0.4s;
    transition: 0.4s;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  }

  input:checked + span {
    background-color: var(--greensea);
  }

  input:focus + span {
    box-shadow: 0 0 1px var(--greensea);
  }

  input:checked + span:before {
    content: 'Given';

    background: var(--turquoise);
    -webkit-transform: translateX(3.35em);
    -ms-transform: translateX(3.35em);
    transform: translateX(3.35em);
  }
`;

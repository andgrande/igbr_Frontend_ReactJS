import styled from 'styled-components';
// import negative from '../../assets/thumbs-down.svg';
// import positive from '../../assets/thumbs-up.svg';
import wrong from '../../assets/wrong.svg';
import done from '../../assets/done.svg';

export const Toggle = styled.label`
  position: relative;
  /* display: inline-block; */
  display: flex;
  align-items: center;
  width: 3.375em;
  height: 1.875em;

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
    content: url(${wrong});
    height: 1.5em;
    width: 1.5em;
    left: 4px;
    bottom: 3px;
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
    content: url(${done});

    background: var(--turquoise);
    -webkit-transform: translateX(1.4em);
    -ms-transform: translateX(1.4em);
    transform: translateX(1.4em);
  }

  /* Rounded sliders */
  span {
    border-radius: 34px;
  }

  span:before {
    border-radius: 50%;
  }
`;

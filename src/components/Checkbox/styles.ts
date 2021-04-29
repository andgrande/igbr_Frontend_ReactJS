import styled from 'styled-components';

export const CheckboxArea = styled.label`
  margin-left: 1rem;
`;

export const ToggleButton = styled.label`
  position: relative;
  display: inline-block;
  width: 8em;
  height: 4em;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bege);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  span:before {
    position: absolute;
    content: '';
    /* content: '\2714'; */
    height: 100%;
    width: 50%;
    left: 4px;
    bottom: 4px;
    background-color: blue;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + span {
    background-color: var(--green);
  }

  input:focus + span {
    box-shadow: 0 0 1px var(--green);
  }

  input:checked + span:before {
    /* background: #16a085; */
    -webkit-transform: translateX(1.625em);
    -ms-transform: translateX(1.625em);
    transform: translateX(1.625em);
  }

  /* Rounded sliders */
  span {
    border-radius: 34px;
  }

  span:before {
    border-radius: 50%;
  }
`;

import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  hasError: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: var(--semi-light);
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 20%;
  height: 4em;
  color: #666360;

  display: flex;
  align-items: center;

  margin: 20px 20px;

  & + div {
    margin-top: 8px;
  }

  /* &:hover {
    border-color: #ff9000;
  } */

  ${props =>
    props.hasError &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: var(-night);
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: black;
    `}

  svg {
    margin-right: 16px;
  }
`;

export const SelectField = styled.select`
  /* flex: 1; */
  width: 90%;
  background: transparent;
  border: 0;
  color: black;

  :optional {
    /* color: blue; */
  }

  &::placeholder {
    color: #666360;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

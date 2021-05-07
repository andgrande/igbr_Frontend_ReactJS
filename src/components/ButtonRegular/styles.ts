import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ActionParam {
  actionParam: string | undefined;
}

export const Container = styled.button<ActionParam>`
  /* margin-top: 24px; */
  min-height: 2em;
  /* height: auto; */
  width: 7em;

  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  font-weight: 500;
  transition: background-color 0.2s;

  ${props =>
    props.actionParam === 'remove' &&
    css`
      background-color: var(--red);
      &:hover {
        background: ${shade(0.2, '#C20E16')};
      }
    `}

  ${props =>
    props.actionParam === 'add' &&
    css`
      background-color: var(--green);

      &:hover {
        background: ${shade(0.2, '#00c4a2')};
      }
    `}
`;

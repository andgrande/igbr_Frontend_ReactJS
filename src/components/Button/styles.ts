import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  margin-top: 24px;
  height: 56px;
  width: 75%;
  background-color: var(--background);
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #312e38;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#b27a7d')};
  }
`;

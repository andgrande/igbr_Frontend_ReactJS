import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  actionParam?: string | undefined;
};

const ButtonRegular: React.FC<ButtonProps> = ({
  children,
  loading,
  actionParam,
  ...rest
}) => (
  <Container type="button" actionParam={actionParam} {...rest}>
    {loading ? 'Handling...' : children}
  </Container>
);

export default ButtonRegular;

import React from 'react';
import {
  Redirect,
  Route as RouteDOM,
  RouteProps as RouterDOMProps,
} from 'react-router-dom';

import { useAuth } from '../hooks/authContext';

interface RouteProps extends RouterDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <RouteDOM
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/classes',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;

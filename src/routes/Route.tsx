import React from 'react';
import {
  Redirect,
  Route as RouteDOM,
  RouteProps as RouterDOMProps,
} from 'react-router-dom';

// import { useAuth } from '../context/AuthContext';

interface RouteProps extends RouterDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  // isPrivate = false,
  component: Component,
  ...rest
}) => {
  // const { user } = useAuth();

  return (
    <RouteDOM
      {...rest}
      render={
        () => {
          return <Component />;
        }

        // return isPrivate === !!user ? (
        //   <Component />
        // ) : (
        //   <Redirect
        //     to={{
        //       pathname: isPrivate ? '/' : '/dashboard',
        //       state: { from: location },
        //     }}
        //   />
        // );
      }
    />
  );
};

export default Route;

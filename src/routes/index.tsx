import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import { SignIn } from '../pages/SignIn';
import { Classes } from '../pages/Classes';
import { Students } from '../pages/Students';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/classes" exact component={Classes} isPrivate />
    <Route path="/students" component={Students} isPrivate />
  </Switch>
);

export default Routes;

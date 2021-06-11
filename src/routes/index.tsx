import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import { Classes } from '../pages/Classes';
import { Students } from '../pages/Students';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Classes} />
    <Route path="/students" component={Students} />
  </Switch>
);

export default Routes;

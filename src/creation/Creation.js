import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import Profile from './Profile';
import New from './New';

export default function Creation() {
  return (
    <div id="creation">
      <Route path="/creation" exact={true} component={Home} />
      <Route path="/creation/me" exact={true} component={Profile} />
      <Route path="/creation/new" exact={true} component={New} />
    </div>
  );
}

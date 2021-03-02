import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Customers from './Customers';
import AddCustomers from './AddCustomers';
import UpdateCustomers from './UpdateCustomers';



function App () {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/add'>
            <AddCustomers />
          </Route>
          <Route path='/update'>
            <UpdateCustomers />
          </Route>
          <Route path='/'>
            <Customers />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Customers from './Customers';
import AddCustomers from './AddCustomers';
import UpdateCustomers from './UpdateCustomers';
import DeleteCustomers from './DeleteCustomers';
import Menu from './Menu';

function App() {
  return (
    <div>
      <div>
        <Router>
          <Menu />
          <Switch>
            <Route path="/add">
              <AddCustomers />
            </Route>
            <Route path="/update">
              <UpdateCustomers />
            </Route>
            <Route path="/delete">
              <DeleteCustomers />
            </Route>
            <Route path="/">
              <Customers />
            </Route>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;

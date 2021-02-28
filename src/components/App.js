import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Customers from './Customers';
import AddCustomers from './AddCustomers';
import UpdateCustomers from './UpdateCustomers';
import axios from 'axios';


function App () {
  const [customers, setCustomers] = useState( [] );

  useEffect( () => {
    const fetchCustomers = async () => {
      const response = await axios.get( 'http://localhost:5000/api/customers' );
      const newData = await response.data;
      setCustomers( newData );
    };

    fetchCustomers();
  }, [setCustomers] );

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
            <Customers customers={ customers } />
            {/* { console.log( customers ) } */ }
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

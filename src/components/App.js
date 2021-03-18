import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Customers from './Customers';
import AddCustomers from './AddCustomers';
import UpdateCustomers from './UpdateCustomers';
import DeleteCustomers from './DeleteCustomers';
import Menu from './Menu';


function App () {
  const [addCustomers, setAddcustomers] = useState({t1:'', t2:''});
  const [updateCustomers, setUpdateCustomers] = useState({t1:'', t2:''});
  const [deleteCustomers, setDeleteCustomers] = useState({t3:'', t4:''});
  const [allCustomers, setAllCustomers] = useState({t3:'', t4:''});
  const [endToEnd, setEndToEnd] = useState({t3:'', t1:''});
  const [cloudProcess, setCloudProcess] = useState({t4: '', t2: ''});

  const handleEndToEnd = () => {
    const {t3, t1} = endToEnd;
    const ms = t3 - t1
    if(t3 && t1 && ms > 0){
      return Math.floor( ms) / 1000 + ' seconds'
    }

    if(t3 === '' && t1 === ''){
      return '(No data)'
    }
  }

  const handleCloudProcessingLatency =() => {
    const {t4, t2} = cloudProcess;
    const ms = t2 - t4;
    if(t4 && t2 && ms > 0) {
      return Math.floor(ms) / 1000 + ' seconds'
    }
    if(t4 === '' && t2 === ''){
      return '(No data)'
    }
  }

  const handleCommunicationLatency = (t1,t2,t3,t4) => {
    return {communication: (t3-t1) - (t4-t2)}
  }


  const onAddCustomerChange = ({t1, t2}) => {
    setAddcustomers({t1, t2});
    setEndToEnd({...endToEnd, t1})
    setCloudProcess({...cloudProcess, t2})
  }

  const onUpdateCustomerChange = ({t1, t2}) => {
    setUpdateCustomers({t1, t2});
    setEndToEnd({...endToEnd, t1})
    setCloudProcess({...cloudProcess, t2})
  }

  const onDeleteCustomerChange = ({t3, t4}) => {
    setDeleteCustomers({t3, t4});
    setEndToEnd({...endToEnd, t3})
    setCloudProcess({...cloudProcess, t4})
  }

  const onAllCustomerChange = ({t3,t4}) => {
    setAllCustomers({t3, t4});
    setEndToEnd({...endToEnd, t3})
    setCloudProcess({...cloudProcess, t4})
  }

  return (
<div>

    <div>
      <Router>
        <Menu />
    <div>
    <p>EndToEnd: {handleEndToEnd()}</p>
    <p>CloudProcessing: {handleCloudProcessingLatency()}</p>
    </div>
        <Switch>
          <Route path='/add'>
            <AddCustomers onChange={onAddCustomerChange}/>
          </Route>
          <Route path='/update'>
            <UpdateCustomers onChange={onUpdateCustomerChange}/>
          </Route>
          <Route path='/delete'>
            <DeleteCustomers onChange={onDeleteCustomerChange}/>
          </Route>
          <Route path='/'>
            <Customers onChange={() => onAllCustomerChange}/>
          </Route>
        </Switch>
      </Router>
    </div>
</div>
  );
}

export default App;

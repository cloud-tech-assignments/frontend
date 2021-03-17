import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
  personal_number: '',
  first_name: '',
  last_name: '',
  date_of_birth: '',
  city: '',
  account_number: ''
};

function AddCustomers ({onChange}) {
  const [newCustomer, setNewCustomer] = useState(initialState);
  const [latency, setLatency] = useState('');

  const onInputChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value.trim()
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log({ newCustomer });
    axios.post('https://backend-cloud-01.herokuapp.com/api/customers/', newCustomer, {t2: Date.now()}).then((response) => {
      console.log(response)
      const t1 = Date.now();
      const t2 = response.config.t2
      const ms = new Date(t1 - t2)
      setLatency({ms: ms.getMilliseconds()})

      onChange({t1, t2})
      console.log(" T1: " + t1 + " T2: " + t2 + " Latency: " + Number(t1 - t2))
      setNewCustomer(
        response.data.newCustomer
      )
    });
  };


  return (
    <div>
    <p>Latency (T1 - T2): {latency.ms}</p>
      <h2>Add customer</h2>
      <form onSubmit={onSubmit}>
        <label >
          Personal Number:
          <input type='number' name='personal_number' onChange={onInputChange} />
        </label>
        <label >
          First name:
          <input type='text' name='first_name' onChange={onInputChange} />
        </label>
        <label >
          Last name:
          <input type='text' name='last_name' onChange={onInputChange} />
        </label>
        <label >
          Date Of Birth:
          <input type='text' name='date_of_birth' onChange={onInputChange} />
        </label>
        <label >
          City:
          <input type='text' name='city' onChange={onInputChange} />
        </label>
        <label >
          Account Number:
          <input type='number' name='account_number' onChange={onInputChange} />
        </label>
        <input type='submit' value='Create' />
      </form>

    </div>
  );
}

export default AddCustomers;

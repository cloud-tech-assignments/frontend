import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
  personal_number: '',
  first_name: '',
  last_name: '',
  date_of_birth: '',
  city: '',
  account_number: '',
};

function AddCustomers() {
  const [newCustomer, setNewCustomer] = useState(initialState);
  const [latency, setLatency] = useState('');

  const onInputChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        'https://backend-cloud-01.herokuapp.com/api/customers/',
        newCustomer,
        {
          t1: Date.now(),
        }
      )
      .then((response) => {
        // end to end
        const t1 = response.config.t1;
        const t3 = Date.now();
        const end = t3 - t1;

        // cloud communication
        const t4 = response.data.t4;
        const t2 = response.data.t2;
        const cloud = t4 - t2;

        //End - Cloud = Communication
        const com = end - cloud;
        setLatency({ end, cloud, com });
        setNewCustomer(response.data.newCustomer);
      });
  };

  return (
    <div>
      <p>Latency (EndToEnd: T3 - T1): {latency.end} ms</p>
      <p>Latency (Cloud Process: T4 - T2): {latency.cloud} ms</p>
      <p>Latency (Comunication: (T3 - T1) - (T4 - T2)): {latency.com} ms</p>
      <h2>Add customer</h2>
      <form onSubmit={onSubmit}>
        <label>
          Personal Number:
          <input
            type="number"
            name="personal_number"
            onChange={onInputChange}
          />
        </label>
        <label>
          First name:
          <input type="text" name="first_name" onChange={onInputChange} />
        </label>
        <label>
          Last name:
          <input type="text" name="last_name" onChange={onInputChange} />
        </label>
        <label>
          Date Of Birth:
          <input type="text" name="date_of_birth" onChange={onInputChange} />
        </label>
        <label>
          City:
          <input type="text" name="city" onChange={onInputChange} />
        </label>
        <label>
          Account Number:
          <input type="number" name="account_number" onChange={onInputChange} />
        </label>
        <input type="submit" value="Create" />
      </form>
    </div>
  );
}

export default AddCustomers;

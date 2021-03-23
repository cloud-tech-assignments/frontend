import React, { useState } from 'react';

import axios from 'axios';

function SearchCustomers() {
  const [latency, setLatency] = useState('');
  const [customer, setCustomer] = useState({});
  const [customerPersonalNumber, setCustomerPersonalNumber] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const t1 = Date.now();
    axios
      .get(
        `http://localhost:5000/api/customers/${customerPersonalNumber}`,
        customer
      )
      .then((response) => {
        // end to end
        const t3 = Date.now();
        const end = t3 - t1;

        // cloud communication
        const t4 = response.data.t4;
        const t2 = response.data.t2;
        const cloud = t4 - t2;

        //End - Cloud = Communication
        const com = end - cloud;
        console.log(response);
        setCustomer(response.data.customer);
        setLatency({ end, cloud, com });
      });
  };

  const getPersonalNumber = (e) => {
    console.log(e.target.value);
    setCustomerPersonalNumber(e.target.value);
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
            onChange={getPersonalNumber}
          />
        </label>

        <input type="submit" value="Search" />
      </form>
      <div>
        <hr />
        <div className="customer-item">
          <h2>{`Personal number: ${customer.personal_number}`}</h2>
          <p>First name: {customer.first_name}</p>
          <p>Last name: {customer.last_name}</p>
          <p>DOB: {customer.date_of_birth}</p>
          <p>City: {customer.city}</p>
          <p>Account number: {customer.account_number}</p>
        </div>
      </div>
    </div>
  );
}

export default SearchCustomers;

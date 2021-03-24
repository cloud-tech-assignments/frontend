import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [latency, setLatency] = useState('');
  useEffect(() => {
    const fetchCustomers = async () => {
      const t1 = Date.now();
      const response = await axios.get(
        'https://backend-cloud-01.herokuapp.com/api/customers/all'
      );
      const newData = await response.data;
      // end to end
      const t3 = Date.now();
      const end = t3 - t1;

      // cloud communication
      const t4 = newData.t4;
      const t2 = newData.t2;
      const cloud = t4 - t2;

      //End - Cloud = Communication
      const com = end - cloud;
      setLatency({ end, cloud, com });
      setCustomers(newData.customers);
    };

    fetchCustomers();
  }, [setCustomers]);

  return (
    <div>
      <p>Latency (EndToEnd: T3 - T1): {latency.end} ms</p>
      <p>Latency (Cloud Process: T4 - T2): {latency.cloud} ms</p>
      <p>Latency (Comunication: (T3 - T1) - (T4 - T2)): {latency.com} ms</p>
      <h1>Total customers: {customers.length}</h1>
      <div className="customer-container">
        {customers.map((item, index) => (
          <div key={index} className="customer-item">
            <h2>Customer: {index + 1}</h2>
            <p>First name: {item.first_name}</p>
            <p>Last name: {item.last_name}</p>
            <p>DOB: {new Date(item.date_of_birth).toLocaleDateString()}</p>
            <p>City: {item.city}</p>
            <p>Personal number: {item.personal_number}</p>
            <p>Account number: {item.account_number}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Customers;

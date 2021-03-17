import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Customers ({onChange}) {
  const [customers, setCustomers] = useState([]);
  const [latency, setLatency] = useState({t4: '', t3: ''});
  const {t4, t3} = latency;
  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get('https://backend-cloud-01.herokuapp.com/api/customers/all');
      const newData = await response.data.customers;
      const t3 = Date.now();
      const t4 = response.data.t4
      const ms = new Date(t3 - t4)
      setLatency({ms: ms.getMilliseconds()})


      console.log(" T3: " + t3 + " T4: " + t4 + " Latency: " + ms.getMilliseconds())
      setCustomers(newData);
    };

    fetchCustomers();
    onChange({t4, t3})
  }, [setCustomers]);


  return (
    <div>
    <p>Latency (T3 - T4): {latency.ms}</p>
      <h1>Total customers: {customers.length}</h1>
      <div className="customer-container">
        {customers.map((item, index) => (
          <div key={index} className="customer-item">
            <h2>Customer: {index + 1}</h2>
            <p>First name: {item.first_name}</p>
            <p>Last name: {item.last_name}</p>
            <p>DOB: {item.date_of_birth}</p>
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

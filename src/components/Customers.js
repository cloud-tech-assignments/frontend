import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Customers () {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get('http://localhost:5000/api/customers/all');
      const newData = await response.data.customers;
      setCustomers(newData);
    };

    fetchCustomers();
  }, [setCustomers]);

  return (
    <div>
      <h1>Total customers: {customers.length}</h1>
      {customers.map((item, index) => (
        <div key={index}>
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
  );
}

export default Customers;

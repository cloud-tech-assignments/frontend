import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './UpdateCustomers.css';

function UpdateCustomers() {
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [customers, setCustomers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [customerPersonalNumber, setCustomerPersonalNumber] = useState(null);
  const [latency, setLatency] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get(
        'https://backend-cloud-01.herokuapp.com/api/customers/all'
      );
      const newData = await response.data.customers;
      setCustomers(newData);
    };
    fetchCustomers();
  }, []);

  const onInputChange = (e) => {
    setCurrentCustomer({
      ...currentCustomer,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = (e) => {
    const t1 = Date.now();
    e.preventDefault();
    setIsUpdating(false);
    axios
      .put(
        `https://backend-cloud-01.herokuapp.com/api/customers/${customerPersonalNumber}`,
        currentCustomer
      )
      .then((response) => {
        const newCustomers = [...customers];
        const { index } = currentCustomer;
        // end to end
        const t3 = Date.now();
        const end = Number(t3 - t1);

        // cloud communication
        const t4 = response.data.t4;
        const t2 = response.data.t2;
        const cloud = Number(t4 - t2);

        //End - Cloud = Communication
        const com = end - cloud;

        setLatency({ end, cloud, com });
        newCustomers[index] = response.data.updatedCustomer;
        setCustomers([...newCustomers]);
      });
  };

  const getCustomerIndex = (idx) => {
    setIsUpdating(true);
    setCurrentCustomer({ customer: customers[idx], index: idx });
    setCustomerPersonalNumber(customers[idx].personal_number);
  };

  console.log(customers.map((customer)=>{return new Date(customer.date_of_birth).toLocaleDateString()}))

  if (isUpdating === true) {
    const { customer } = currentCustomer;
    return (
      <form onSubmit={onSubmit}>
        <label>
          First name:
          <input
            type="text"
            name="first_name"
            defaultValue={customer.first_name}
            onChange={onInputChange}
          />
        </label>
        <label>
          Last name:
          <input
            type="text"
            name="last_name"
            defaultValue={customer.last_name}
            onChange={onInputChange}
          />
        </label>
        <label>
          Date Of Birth:
          <input
            type="date"
            name="date_of_birth"
            defaultValue={customer.date_of_birth}
            onChange={onInputChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            defaultValue={customer.city}
            onChange={onInputChange}
          />
        </label>
        <label>
          Account Number:
          <input
            type="number"
            name="account_number"
            defaultValue={customer.account_number}
            onChange={onInputChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  } else {
    return (
      <>
        <div>
          <p>Latency (EndToEnd: T3 - T1): {latency.end} ms</p>
          <p>Latency (Cloud Process: T4 - T2): {latency.cloud} ms</p>
          <p>Latency (Comunication: (T3 - T1) - (T4 - T2)): {latency.com} ms</p>
          <h2>Select customer to update</h2>
          <div className="customer-container">
            {customers.map((customer, i) => {
              const dob = new Date(customer.date_of_birth).toLocaleDateString()
              return (
              <div key={i} className="customer-item">
                <h3>{`Personal number: ${customer.personal_number}`}</h3>
                <p>First name: {customer.first_name}</p>
                <p>Last name: {customer.last_name}</p>
                <p>DOB: {dob}</p>
                <p>City: {customer.city}</p>
                <p>Account number: {customer.account_number}</p>
                <button
                  className="button"
                  onClick={() => {
                    getCustomerIndex(i);
                  }}
                >
                  Update
                </button>
              </div>
            )})}
          </div>
        </div>
      </>
    );
  }
}

export default UpdateCustomers;

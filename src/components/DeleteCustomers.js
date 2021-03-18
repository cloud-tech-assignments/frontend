import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateCustomers ({onChange}) {
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [customers, setCustomers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [customerPersonalNumber, setCustomerPersonalNumber] = useState(null);
  const [latency, setLatency] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await axios.get('https://backend-cloud-01.herokuapp.com/api/customers/all');
      const newData = await response.data.customers;
      console.log(response)
      setCustomers(newData);
    };
    fetchCustomers();
  }, []);

  const onClickYesHandler = () => {
    setIsUpdating(false);
    axios.delete(`https://backend-cloud-01.herokuapp.com/api/customers/${ customerPersonalNumber }`, currentCustomer).then((response) => {
      const t1 = Date.now();
      const t2 = response
      const ms = new Date(t1 - t2)
      setLatency({ms: ms.getMilliseconds()})
      onChange({t2, t1})

      console.log(" T2: " + t2 + " T1: " + t1 + " Latency: " + Number(t2 - t1))
    });
  };

  const onClickNoHandler = () => {
    setIsUpdating(false);
  };

  const getCustomerIndex = (idx) => {
    setIsUpdating(true);
    setCurrentCustomer({ customer: customers[idx], index: idx });
    setCustomerPersonalNumber(customers[idx].personal_number);
  };

  if (isUpdating === true) {
    return (
      <div className="customer-container">
        <div className="customer-item">
          <h2>Are you sure you want to delete this customer?</h2>
          <button className="button" onClick={onClickYesHandler}>Yes</button>
          <button className="button" onClick={onClickNoHandler}>No</button>
        </div>
      </div>
    );
  } else {
    return (
      <>
    <p>Latency (T3 - T4): {latency.ms}</p>
        <h2>Select customer to Delete</h2>
        <div className="customer-container">
          {customers.map((customer, i) => (
            <div key={i} className="customer-item">
              <h3>
                {`Personal number: ${ customer.personal_number }`}
              </h3>
              <p>First name: {customer.first_name}</p>
              <p>Last name: {customer.last_name}</p>
              <p>DOB: {customer.date_of_birth}</p>
              <p>City: {customer.city}</p>
              <p>Account number: {customer.account_number}</p>
              <button className="button" onClick={() => {
                getCustomerIndex(i);
              }}> Remove</button>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default UpdateCustomers;
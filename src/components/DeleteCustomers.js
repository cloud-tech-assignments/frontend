import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateCustomers() {
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [customers, setCustomers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [customerPersonalNumber, setCustomerPersonalNumber] = useState(null);
  const [latency, setLatency] = useState('');
  const [renderDeleted, setRenderDeleted] = useState(false)

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

  const onClickYesHandler = () => {
    const t1 = Date.now();
    setIsUpdating(false);
    axios
      .delete(
        `https://backend-cloud-01.herokuapp.com/api/customers/${customerPersonalNumber}`,
        currentCustomer
      )
      .then((response) => {
        const deletedCustomers = [...customers];
        const { index } = currentCustomer;
        // end to end
        const t3 = Date.now();
        const end = t3 - t1;

        // cloud communication
        const t4 = response.data.t4;
        const t2 = response.data.t2;
        const cloud = t4 - t2;

        //End - Cloud = Communication
        const com = end - cloud;
        setLatency({ end, cloud, com });
        deletedCustomers[index] = response.data.deletedCustomer;
        const customerList = [...customers];
        const filteredList = customerList.filter(current => current !== currentCustomer.customer);
        setCustomers(filteredList);
        setRenderDeleted(true);
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
          <button className="button" onClick={onClickYesHandler}>
            Yes
          </button>
          <button className="button" onClick={onClickNoHandler}>
            No
          </button>
        </div>
      </div>
    );
  } else if(renderDeleted){
      return (
        <div className="customer-item">
        <h2>Customer deleted</h2>
          <h3>{`Personal number: ${currentCustomer.customer.personal_number}`}</h3>
          <p>First name: {currentCustomer.customer.first_name}</p>
          <p>Last name: {currentCustomer.customer.last_name}</p>
          <p>
            DOB: {new Date(currentCustomer.customer.date_of_birth).toLocaleDateString()}
          </p>
          <p>City: {currentCustomer.customer.city}</p>
          <p>Account number: {currentCustomer.customer.account_number}</p>
          <button
            className="button"
            onClick={() => {
              setRenderDeleted(false);
            }}
          >
            Go back
          </button>
        </div>
      );
  }else{
    return (
      <>
        <p>Latency (EndToEnd: T3 - T1): {latency.end} ms</p>
        <p>Latency (Cloud Process: T4 - T2): {latency.cloud} ms</p>
        <p>Latency (Comunication: (T3 - T1) - (T4 - T2)): {latency.com} ms</p>
        <h2>Select customer to Delete</h2>
        <div className="customer-container">
          {customers.map((customer, i) => (
            <div key={i} className="customer-item">
              <h3>{`Personal number: ${customer.personal_number}`}</h3>
              <p>First name: {customer.first_name}</p>
              <p>Last name: {customer.last_name}</p>
              <p>DOB: {new Date(customer.date_of_birth).toLocaleDateString()}</p>
              <p>City: {customer.city}</p>
              <p>Account number: {customer.account_number}</p>
              <button
                className="button"
                onClick={() => {
                  getCustomerIndex(i);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </>
    );

  }

}

export default UpdateCustomers;

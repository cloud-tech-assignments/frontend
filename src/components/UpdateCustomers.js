import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UpdateCustomers() {
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [customers, setCustomers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [customerPersonalNumber, setCustomerPersonalNumber] = useState(null);

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

  const onChange = (e) => {
    setCurrentCustomer({
      ...currentCustomer,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = (e) => {
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
        newCustomers[index] = response.data.updatedCustomer;
        setCustomers([...newCustomers]);
      });
  };

  const getCustomerIndex = (idx) => {
    setIsUpdating(true);
    setCurrentCustomer({ customer: customers[idx], index: idx });
    setCustomerPersonalNumber(customers[idx].personal_number);
  };

  if (isUpdating === true) {
    const { customer } = currentCustomer;
    return (
      <form onSubmit={onSubmit}>
        <label>
          Personal Number:
          <input
            type="number"
            name="personal_number"
            defaultValue={customer.personal_number}
            onChange={onChange}
          />
        </label>
        <label>
          First name:
          <input
            type="text"
            name="first_name"
            defaultValue={customer.first_name}
            onChange={onChange}
          />
        </label>
        <label>
          Last name:
          <input
            type="text"
            name="last_name"
            defaultValue={customer.last_name}
            onChange={onChange}
          />
        </label>
        <label>
          Date Of Birth:
          <input
            type="text"
            name="date_of_birth"
            defaultValue={customer.date_of_birth}
            onChange={onChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            defaultValue={customer.city}
            onChange={onChange}
          />
        </label>
        <label>
          Account Number:
          <input
            type="number"
            name="account_number"
            defaultValue={customer.account_number}
            onChange={onChange}
          />
        </label>
        <input type="submit" value="Update" />
      </form>
    );
  } else {
    return (
      <>
        <div>
          <h2>Select customer to update</h2>
          {customers.map((customer, i) => (
            <div key={i}>
              <h3>{`Personal number: ${customer.personal_number}`}</h3>
              <p>First name: {customer.first_name}</p>
              <p>Last name: {customer.last_name}</p>
              <p>DOB: {customer.date_of_birth}</p>
              <p>City: {customer.city}</p>
              <p>Account number: {customer.account_number}</p>
              <button
                onClick={() => {
                  getCustomerIndex(i);
                }}
              >
                {' '}
                Update
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default UpdateCustomers;

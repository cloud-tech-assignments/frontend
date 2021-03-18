import React, { useState, useEffect } from 'react';
import axios from 'axios';

<<<<<<< HEAD
function UpdateCustomers() {
=======
import './UpdateCustomers.css';

function UpdateCustomers ({onChange}) {
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
  const [currentCustomer, setCurrentCustomer] = useState({});
  const [customers, setCustomers] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [customerPersonalNumber, setCustomerPersonalNumber] = useState(null);
  const [latency, setLatency] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
<<<<<<< HEAD
      const response = await axios.get(
        'https://backend-cloud-01.herokuapp.com/api/customers/all'
      );
=======
      const response = await axios.get('https://backend-cloud-01.herokuapp.com/api/customers/all');
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
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
    e.preventDefault();
    setIsUpdating(false);
<<<<<<< HEAD
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
=======
    axios.put(`https://backend-cloud-01.herokuapp.com/api/customers/${ customerPersonalNumber }`, currentCustomer, {t2: Date.now()}).then((response) => {
      const newCustomers = [...customers];
      const { index } = currentCustomer;
      const t1 = Date.now();
      const t2 = response.config.t2;
      const ms = new Date(t1 - t2)
      setLatency({ms: ms.getMilliseconds()})
      onChange({t1, t2})
      console.log(" T1: " + t1 + " T2: " + t2 + " Latency: " + Number(t1 - t2));
      newCustomers[index] = response.data.updatedCustomer;
      setCustomers([...newCustomers]);
    });
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
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
<<<<<<< HEAD
          <input
            type="number"
            name="personal_number"
            defaultValue={customer.personal_number}
            onChange={onChange}
          />
=======
          <input type='number' name='personal_number' defaultValue={customer.personal_number} onChange={onInputChange} />
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
        </label>
        <label>
          First name:
<<<<<<< HEAD
          <input
            type="text"
            name="first_name"
            defaultValue={customer.first_name}
            onChange={onChange}
          />
=======
          <input type='text' name='first_name' defaultValue={customer.first_name} onChange={onInputChange} />
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
        </label>
        <label>
          Last name:
<<<<<<< HEAD
          <input
            type="text"
            name="last_name"
            defaultValue={customer.last_name}
            onChange={onChange}
          />
=======
          <input type='text' name='last_name' defaultValue={customer.last_name} onChange={onInputChange} />
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
        </label>
        <label>
          Date Of Birth:
<<<<<<< HEAD
          <input
            type="text"
            name="date_of_birth"
            defaultValue={customer.date_of_birth}
            onChange={onChange}
          />
=======
          <input type='text' name='date_of_birth' defaultValue={customer.date_of_birth} onChange={onInputChange} />
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
        </label>
        <label>
          City:
<<<<<<< HEAD
          <input
            type="text"
            name="city"
            defaultValue={customer.city}
            onChange={onChange}
          />
=======
          <input type='text' name='city' defaultValue={customer.city} onChange={onInputChange} />
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
        </label>
        <label>
          Account Number:
<<<<<<< HEAD
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
=======
          <input type='number' name='account_number' defaultValue={customer.account_number} onChange={onInputChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>);
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
  } else {
    return (
      <>
        <div>
    <p>Latency (T1 - T2): {latency.ms}</p>
          <h2>Select customer to update</h2>
<<<<<<< HEAD
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
=======
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
                }}>Update</button>
              </div>
            ))}
          </div>
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
        </div>
      </>
    );
  }
}

export default UpdateCustomers;

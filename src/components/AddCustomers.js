import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
  personal_number: '',
  first_name: '',
  last_name: '',
  date_of_birth: '',
  city: '',
  account_number: ''
};

function AddCustomers () {
  const [newCustomer, setNewCustomer] = useState(initialState);

  const onChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value.trim()
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ newCustomer });
    axios.post('http://localhost:5000/api/customers/', newCustomer).then((response) => {
      console.log(response);
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label >
          Personal Number:
          <input type='number' name='personal_number' onChange={onChange} />
        </label>
        <label >
          First name:
          <input type='text' name='first_name' onChange={onChange} />
        </label>
        <label >
          Last name:
          <input type='text' name='last_name' onChange={onChange} />
        </label>
        <label >
          Date Of Birth:
          <input type='text' name='date_of_birth' onChange={onChange} />
        </label>
        <label >
          City:
          <input type='text' name='city' onChange={onChange} />
        </label>

        <label >
          Account Number:
          <input type='number' name='account_number' onChange={onChange} />
        </label>
        <input type='submit' value='Create' />
      </form>
    </div>
  );
}

export default AddCustomers;

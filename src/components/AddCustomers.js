import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
  personal_number: '',
  first_name: '',
  last_name: '',
  date_of_birth: '',
  city: '',
  account_number: '',
};

<<<<<<< HEAD
function AddCustomers() {
=======
function AddCustomers ({onChange}) {
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
  const [newCustomer, setNewCustomer] = useState(initialState);
  const [latency, setLatency] = useState('');

  const onInputChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD
    console.log({ newCustomer });
    axios
      .post(
        'https://backend-cloud-01.herokuapp.com/api/customers/',
        newCustomer
      )
      .then((response) => {
        console.log(response);
      });
=======
    // console.log({ newCustomer });
    axios.post('https://backend-cloud-01.herokuapp.com/api/customers/', newCustomer, {t2: Date.now()}).then((response) => {
      console.log(response)
      const t1 = Date.now();
      const t2 = response.config.t2
      const ms = new Date(t1 - t2)
      setLatency({ms: ms.getMilliseconds()})

      onChange({t1, t2})
      console.log(" T1: " + t1 + " T2: " + t2 + " Latency: " + Number(t1 - t2))
      setNewCustomer(
        response.data.newCustomer
      )
    });
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
  };


  return (
    <div>
    <p>Latency (T1 - T2): {latency.ms}</p>
      <h2>Add customer</h2>
      <form onSubmit={onSubmit}>
        <label>
          Personal Number:
<<<<<<< HEAD
          <input type="number" name="personal_number" onChange={onChange} />
=======
          <input type='number' name='personal_number' onChange={onInputChange} />
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
        </label>
        <label>
          First name:
<<<<<<< HEAD
          <input type="text" name="first_name" onChange={onChange} />
=======
          <input type='text' name='first_name' onChange={onInputChange} />
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
        </label>
        <label>
          Last name:
<<<<<<< HEAD
          <input type="text" name="last_name" onChange={onChange} />
=======
          <input type='text' name='last_name' onChange={onInputChange} />
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
        </label>
        <label>
          Date Of Birth:
<<<<<<< HEAD
          <input type="text" name="date_of_birth" onChange={onChange} />
=======
          <input type='text' name='date_of_birth' onChange={onInputChange} />
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
        </label>
        <label>
          City:
<<<<<<< HEAD
          <input type="text" name="city" onChange={onChange} />
        </label>

        <label>
          Account Number:
          <input type="number" name="account_number" onChange={onChange} />
=======
          <input type='text' name='city' onChange={onInputChange} />
        </label>
        <label >
          Account Number:
          <input type='number' name='account_number' onChange={onInputChange} />
>>>>>>> b7d7f67665ce64ca932aef483b20b29f96c5ce40
        </label>
        <input type="submit" value="Create" />
      </form>

    </div>
  );
}

export default AddCustomers;

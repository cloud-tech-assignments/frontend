import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
  personal_number: '',
  first_name: '',
  last_name: '',
  date_of_birth: '',
  city: '',
};

function AddCustomers() {
  const [newCustomer, setNewCustomer] = useState(initialState);
  const [latency, setLatency] = useState('');
  const [renderNewCustomer, setRenderCustomer] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const[isError, setIsError] = useState(false)

  const onInputChange = (e) => {
    setNewCustomer({
      ...newCustomer,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let today = new Date(Date.now()).toISOString();

    if(newCustomer.date_of_birth > today) {
      return (alert("Date can't be in the future"));
    } else {
      axios
      .post(
        'https://backend-cloud-01.herokuapp.com/api/customers/',
        newCustomer,
        {
          t1: Date.now(),
        }
      )
      .then((response) => {
        // end to end
        const t1 = response.config.t1;
        const t3 = Date.now();
        const end = t3 - t1;

        // cloud communication
        const t4 = response.data.t4;
        const t2 = response.data.t2;
        const cloud = t4 - t2;

        //End - Cloud = Communication
        const com = end - cloud;

        setRenderCustomer(response.data.newCustomer)
        setLatency({ end, cloud, com });
        setNewCustomer(response.data.newCustomer);
        setIsUpdating(true);
      }).catch((error)=>{
        if(error){
          setIsError(true);
        }
      })
    }

    

  };

      if (isError) {
        return (
          <div className="customer-container">
            <div>
              <h1>Oops! Something went wrong..</h1>
              <p>Perhaps the personal number is already in use</p>
              <button
                onClick={() => {
                  setIsError(false);
                }}
              >
                Go back to add user
              </button>
            </div>
          </div>
        );
      } else if (isUpdating === true) {
    return (
      <div>
        <p>Latency (EndToEnd: T3 - T1): {latency.end} ms</p>
        <p>Latency (Cloud Process: T4 - T2): {latency.cloud} ms</p>
        <p>latency (Comunication: (T3 - T1) - (T4 - T2)): {latency.com}ms</p>
        <div className="customer-item">
          <h3>Customer successfully created! </h3>
          <h4>Generated account number is {renderNewCustomer.account_number} </h4>
          <p>First name: {renderNewCustomer.first_name}</p>
          <p>Last name: {renderNewCustomer.last_name}</p>
          <p>
            DOB:
            {new Date(renderNewCustomer.date_of_birth).toLocaleDateString()}
          </p>
          <p>City: {renderNewCustomer.city}</p>
          <p>Personal number: {renderNewCustomer.personal_number}</p>
          <button onClick={() => setIsUpdating(false)}>Go back</button>
        </div>
      </div>
    );
  }
   else {
    return (
      <div>
        <p>Latency (EndToEnd: T3 - T1): {latency.end} ms</p>
        <p>Latency (Cloud Process: T4 - T2): {latency.cloud} ms</p>
        <p>latency (Comunication: (T3 - T1) - (T4 - T2)): {latency.com}ms</p>

        <h2>Add customer</h2>
        <form onSubmit={onSubmit}>
          <label>
            Personal Number:
            <input
              type="number"
              name="personal_number"
              onChange={onInputChange}
            />
          </label>
          <label>
            First name:
            <input
              type="text"
              name="first_name"
              onChange={onInputChange}
              required
            />
          </label>
          <label>
            Last name:
            <input
              type="text"
              name="last_name"
              onChange={onInputChange}
              required
            />
          </label>
          <label>
            Date Of Birth:
            <input
              type="date"
              name="date_of_birth"
              onChange={onInputChange}
              required
            />
          </label>
          <label>
            City:
            <input type="text" name="city" onChange={onInputChange} required />
          </label>
          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }}

export default AddCustomers;

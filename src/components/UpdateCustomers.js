import React from 'react';

function UpdateCustomers () {
  return (
    <div>
      <form>
        <label >
          First name:
          <input type='text' name='firstName' />
        </label>
        <label >
          Last name:
          <input type='text' name='firstName' />
        </label>
        <label >
          Date Of Birth:
          <input type='date' name='firstName' />
        </label>
        <label >
          City:
          <input type='text' name='firstName' />
        </label>
        <label >
          Personal Number:
          <input type='number' name='firstName' />
        </label>
        <label >
          Account Number:
          <input type='number' name='firstName' />
        </label>
        <input type='submit' value='Update' />
      </form>
    </div>
  );
}

export default UpdateCustomers;

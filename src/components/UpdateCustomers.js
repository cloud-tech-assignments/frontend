import React from 'react';

function UpdateCustomers () {
  return (
    <div>
      <form>
        <label >
          First name:
          <input type='text' name='first_name' />
        </label>
        <label >
          Last name:
          <input type='text' name='second_name' />
        </label>
        <label >
          Date Of Birth:
          <input type='date' name='date_of_birth' />
        </label>
        <label >
          City:
          <input type='text' name='city' />
        </label>
        <label >
          Personal Number:
          <input type='number' name='personal_number' />
        </label>
        <label >
          Account Number:
          <input type='number' name='account_number' />
        </label>
        <input type='submit' value='Update' />
      </form>
    </div>
  );
}

export default UpdateCustomers;

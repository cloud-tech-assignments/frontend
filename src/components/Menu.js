import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  return (
    <div className="nav">
      <Link to="/">Show all</Link>
      <Link to="/search">Search</Link>
      <Link to="/add">Add</Link>
      <Link to="/update">Update</Link>
      <Link to="/delete">Delete</Link>
    </div>
  );
}

export default Menu;

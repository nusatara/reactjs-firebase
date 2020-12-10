import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Sidebar.css'
import {Link} from 'react-router-dom'

export default props => {
  return (
    <Menu>
      <Link to="/" className="menu-item" >
        Home
      </Link>
      <Link to="/login" className="menu-item" >
        Login
      </Link>
      <Link to="/register"className="menu-item" >
        Register
      </Link>
    </Menu>
  );
};
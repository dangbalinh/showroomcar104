import {NavLink,Link} from 'react-router-dom'
import classes from './Header.module.css'
import { useState, useEffect, useRef } from 'react'
const Dropdown = ({ submenus, dropdownstate }) => {
    return (
      <ul 
      className={(dropdownstate ? classes.dropdownshow : classes.dropdown)}
      >
        {submenus.map((submenu) => (
          <li className={classes.submenu}>
            <Link style={{}}
            to={submenu.url}>{submenu.title}</Link>
          </li>
        ))}
      </ul>
    );
  };
  
  export default Dropdown;
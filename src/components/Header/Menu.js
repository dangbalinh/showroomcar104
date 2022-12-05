import {NavLink} from 'react-router-dom'
import classes from './Header.module.css'
import Dropdown from './Dropdown.js'
import { useState, useEffect, useRef } from 'react'
const Menu = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);
  let ref = useRef();
  useEffect(() => {
    const handler = (event) => {
     if (dropdown && ref.current && !ref.current.contains(event.target)) {
      setDropdown(false);
     }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
     document.removeEventListener("mousedown", handler);
     document.removeEventListener("touchstart", handler);
    };
   }, [dropdown]);
  return (
      <li className={classes.menu} ref={ref}>
        {item.submenu ? (
         <div style={{ position:'relative'}}  > 
            <NavLink role="button"
           className={classes.item}           
           onClick={()=>setDropdown((prev)=>!prev)}
           end>{item.title}</NavLink>
            <div onClick={()=>setDropdown((prev)=>!prev)}>
            <Dropdown 
            dropdownstate={dropdown} submenus={item.submenu}></Dropdown>
            </div>
         </div>
        ) : (
            <NavLink to={item.url}
           className={({isActive}) => (isActive ? classes.active : classes.item)}
           end>{item.title}</NavLink>
        )}
      </li>
    );
        }
export default Menu;
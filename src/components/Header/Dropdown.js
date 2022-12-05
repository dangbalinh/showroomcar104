
import classes from './Header.module.css'

const Dropdown = ({ submenus, dropdownstate }) => {
    return (
      <ul 
      className={(dropdownstate ? classes.dropdownshow : classes.dropdown)}
      >
        {submenus.map((submenu,index) => (
          <li key={index} className={classes.submenu}>
            {/* <Link style={{}}
            to={submenu.url}>{submenu.title}</Link> */}

            <a href={submenu.url}>{submenu.title}</a>
          </li>
        ))}
      </ul>
    );
  };
  
  export default Dropdown;
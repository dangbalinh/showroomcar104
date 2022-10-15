import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import classes from "../Header.module.css"
import { useState, useRef,useEffect  } from "react";

const AutoComplete = ( {data} ) => {
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [value, setValue] = useState("");


    const handleChange = (e) => {
        const query = e.target.value.toLowerCase();
        setValue(query);
        if (query.length > 1) {
          const filterSuggestions = data.filter(
            (suggestion) => suggestion.toLowerCase().includes(query)
          );
          setSuggestions(filterSuggestions);
          setSuggestionsActive(true);
        } else {
          setSuggestionsActive(false);
        }
      };

      const handleClick2 = (e) => {
        setSuggestions([]);
        setValue(e.target.innerText);
        setSuggestionsActive(false);
      };
    
      let ref = useRef();
  useEffect(() => {
    const handler = (event) => {
     if (suggestionsActive && ref.current && !ref.current.contains(event.target)) {
        setSuggestionsActive(false);
     }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
     document.removeEventListener("mousedown", handler);
     document.removeEventListener("touchstart", handler);
    };
   }, [suggestionsActive]);

      const Suggestions = () => {
        return (
          <ul className={classes.dropdownshow}
          style={{left:'10%', width:'80%'} } ref={ref}
          >
            {suggestions.map((suggestion, index) => {
              return (
                <li
                  key={index}
                  onClick={handleClick2}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      };

  return (
    <div className={classes.wrapper}>
      <input type="text" placeholder="Search.."
       value={value}
       onChange={handleChange}
    ></input>     
    {suggestionsActive && <Suggestions />}
    <SearchRoundedIcon fontSize="large" className={classes.icons}/>
    </div>
  );
};

export default AutoComplete;
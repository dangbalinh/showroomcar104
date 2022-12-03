import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import classes from "../Header.module.css"
import { useState, useRef,useEffect  } from "react";
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';


const AutoComplete = () => {
    const [suggestiondata, setSuggestiondata] = useState();
    const [suggestions, setSuggestions] = useState();
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [value, setValue] = useState("");
    const navigate = useNavigate();
    const typingTimeoutRef = useRef(null);

    const sendRequest = async()=>{
      const res = await axios
      .get("https://showroomcar104.onrender.com/cars")
      .catch((err)=>console.log(err))
      const data = await res.data.cars;
      console.log(data);
      return data;
    }
    useEffect(()=>{
      sendRequest().then(data=>setSuggestiondata(data))
    },[])
    

    const handleChange = (e) => {
        const query = e.target.value.toLowerCase();
        setValue(query);
        
        if(typingTimeoutRef.current){
          clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(()=>{
          if (query.length > 1) {
            const filterSuggestions = suggestiondata.filter(dt =>{
              const regex = new RegExp(`${query}`,'gi');
              return dt.ten.match(regex);
            });
            setSuggestions(filterSuggestions);
            setSuggestionsActive(true);
            console.log(query);
          } else {
            setSuggestionsActive(false);
          }
        },300)
      };

      const handleClick2 = (e) => {
        setSuggestions();
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
                  className={classes.submenu}
                >
                  <Link to={`/detailproduct/${suggestion._id}`} style={{color: "black", textDecoration:"none"}}>{suggestion.ten}</Link>
                </li>
              );
            })}
          </ul>
        );
      };
const handleKeyDown = (event) => {
        if (event.key === 'Enter'&&event.target.value.length>1) {
          const searchUrl=encodeURI(event.target.value);
          console.log(searchUrl);
          setSuggestionsActive(false);
          navigate(`/search?find=${searchUrl}`)
        }
      }
  return (
    <div className={classes.wrapper}>
      <input type="text" placeholder="Search.."
       value={value}
       onChange={handleChange}
       onKeyDown={handleKeyDown}
    ></input>     
    {suggestionsActive && <Suggestions />}
    <SearchRoundedIcon fontSize="large" className={classes.icons}/>
    </div>
  );
};

export default AutoComplete;
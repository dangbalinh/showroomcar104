import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import Stack from '@mui/material/Stack';

function Lct (props){
    return (
    <div style={{ padding:"0 0 25px 0" }}>
        <p style={{ color: 'white',fontSize:'14px' }}>{props.city}</p>
        
        <Stack direction="row" alignItems="center" gap={1}>
          <SavedSearchIcon  style={{ color: '#AE0D0D', fontSize:'25px' }}/>
          <p style={{ color: '#AFAFAF',fontSize:'14px' }}>{props.address}</p>
        </Stack>
        
    </div>
    );

}
export default Lct;
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
// import MerchantContext from './Context/MerchantContext';

export default function Merchantnames({merchant, setMerchant, handleNameChanges}) {
  const [names, setNames] = React.useState([])
  // const [ merchant, setMerchant ] = React.useState();

  const handleChange = (event) => {
    // setMerchant(event.target.value)
    handleNameChanges(event.target.value);
  };

  React.useEffect(()=>{
    axios.get("http://localhost:3000/getnames")
      .then((res) =>{
        setNames(res.data);
      })
  }, [])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Merchant Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={merchant}
          label="Merchant Name"
          onChange={handleChange}
        >
          {names.map((name) => (
              <MenuItem value={name} key={name} >
                {name}
              </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
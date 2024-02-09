import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import useDocumentTitle from "../Hooks/TitleChanger";
import Merchantnames from './Merchantnames';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Home = ()=> {

  useDocumentTitle("Online Shopping site")
  // const [merchant, setMerchant] = React.useState("Grant PLC")
  const [ merchant, setMerchant ] = React.useState("Grant PLC")
  const [output, setOutput] = React.useState([]);

  const [names, setNames] = useState([])

  useEffect(() => {
    console.log(merchant)
    axios.get(`http://localhost:3000/getchart/${merchant}`)
      .then((res) => {
        const newData = res.data.map((s) => ({ ...s, data: s.data }));
        console.log(newData)
        setOutput(newData);
      })
      .catch((error) => {
        console.error("Error fetching chart data:", error);
      });
  }, [merchant]);
  

  useEffect(()=>{
    axios.get("http://localhost:3000/getnames")
      .then((res) =>{
        setNames(res.data);
      })
  }, [])

  return (
    <Box sx={{ width: "100%", margin: 'auto' }}>

      <BarChart
        height={420}
        series={output
          .map((s) => ({ ...s, data: s.data }))}
          xAxis={[
            {
              scaleType: 'band',
              data: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ],
              categoryGapRatio: 0.3,
              barGapRatio: 0.1
            }
          ]}
      />
        <Typography
          variant="h5"
          component="h4"
          sx={{ textAlign: 'center', mt: 3, mb: 3 }}
        >
          Select Merchants:
        </Typography>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Merchant Name</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={merchant}
              label="Merchant Name"
              onChange={(e)=>{
                // console.log(e.target.value);
                setMerchant(e.target.value)}}
            >
              {names.map((name) => (
                  <MenuItem value={name} key={name} >
                    {name}
                  </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
    </Box>
  );
}

export default Home;
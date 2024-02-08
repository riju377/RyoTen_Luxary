import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import useDocumentTitle from "../Hooks/TitleChanger";
import Merchantnames from './Merchantnames';
import axios from 'axios';

const Home = ()=> {

  useDocumentTitle("Online Shopping site")
  const [merchant, setMerchant] = React.useState("Grant PLC")
  const [output, setOutput] = React.useState([]);

  React.useEffect(() =>{
    axios.get(`http://localhost:3000/getchart/${merchant||"Grant PLC"}`)
      .then((res)=>{
        setOutput(res.data);
      })

  }, [merchant]);

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
      <Merchantnames merchant={merchant} setMerchant={setMerchant}/>
    </Box>
  );
}

export default Home;
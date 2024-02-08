import react, { useState, useEffect } from "react";
import { DataGrid} from "@mui/x-data-grid";
import { Box, Typography, colors } from '@mui/material';
import { grey } from '@mui/material/colors';
import useDocumentTitle from "../Hooks/TitleChanger";
import clsx from 'clsx';
import './static/DashboardStyles.css';
import axios from "axios";

const Dashboard = ()=>{

    useDocumentTitle("Admin Dashboard");
    const columns = [
        {field: 'TransactionID', headerName : 'Transaction ID', width: 400,
          cellClassName: (params) =>
          clsx('link'),
        },
        {field: 'MerchantName', headerName : 'Merchant Name', width: 200},
        {field: 'Amount', headerName : 'Amount (in ₹)', width: 230},
        {field: 'Status', headerName : 'Status', width: 190},
        { field: 'InitiatedAt',
          headerName : 'Initiated At',
          width: 190
        },
        {field: "LastUpdatedAt", headerName : 'Last Updated At', width: 190},
    ]

    const [pageSize, setPageSize] = useState(5);

    const viewTransactionDetails = (props) => {
      console.log(props);
      window.location.href = `transactiondetails/${props.TransactionID}`;
    }
    
    const [rows, setRows] = useState([]);
    useEffect(() => {
      // Fetch transaction data from backend
      axios.get('http://localhost:3000/transactions')
        .then(response => {
          setRows(response.data);
        })
        .catch(error => {
          console.error('Error fetching transaction data:', error);
        });
    }, []);
      
    return (
        <Box
        sx={{ 
          margin: 'auto', 
          width: 'fit-content', 
          height: 450, 
        }}
        >
        <Typography
          variant="h4"
          component="h4"
          sx={{ textAlign: 'center', mt: 3, mb: 3 }}
        >
          Manage Transactions
        </Typography>
        <DataGrid
          rows={rows} 
          columns={columns}
          autoPageSize
          pageSizeOptions={[5, 10, 20]}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{ '& .MuiDataGrid-row': { 
            borderTopColor: (theme)=>
            theme.palette.mode ==='light' ?  "white" : "black",
            borderTopStyle: 'solid',
            bgcolor: (theme)=>
              theme.palette.mode ==='light' ? grey[200] : grey[900],
            },
            '& .MuiDataGrid-cell': {
              fontSize: '1.1rem',
            },
        
          }}
          onCellClick={(params) => {
            if(params.field == 'TransactionID') viewTransactionDetails(params.row);
          }}
        />
      </Box>
    )
}

export default Dashboard;
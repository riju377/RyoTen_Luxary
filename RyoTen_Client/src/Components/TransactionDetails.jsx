import React, {useState, useEffect} from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { Box, Typography } from '@mui/material';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import useDocumentTitle from "../Hooks/TitleChanger";
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function TransactionDetails() {

    useDocumentTitle("Transaction Details")
    const {id} = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/transactiondetails/${id}`)
          .then(response => {
            setData(response.data);
          })
          .catch(error => {
            console.error('Error fetching transaction data:', error);
          });
      }, []);

  return (
    <Box
        sx={{
            height: 400,
            width: '100%',
        }}
    >
        <Typography
        variant="h4"
        sx={{ textAlign: 'center', mt: 3, mb: 3, color:"text.secondary" }}
        >
            Transaction {data.Status}
        </Typography>
        <Typography
            variant="h5"
            component="h4"
            sx={{ textAlign: 'center', mt: 3, mb: 3, color:"text.secondary" }}
        >
            Transaction ID - {id}
        </Typography>

        <Timeline
        >

            {data.Status == 'Failed' ? 
            <TimelineItem>
                <TimelineOppositeContent 
                sx={{ m: '20px 0' }}
                align="right"
                color="text.secondary"
                >
                {data.InitiatedAt}
                </TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineDot color='error'> 
                    <CloseRoundedIcon  fontSize="large"/> 
                </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ py: '20px', px: 2 }}>
                <Typography variant="h6" component="span">
                    Order Failed
                </Typography>
                <Typography>An error occured while recieving the order.</Typography>
                <Typography>By {data.MerchantName}</Typography>
                </TimelineContent>
            </TimelineItem>
            :null}

            {/* order Intiated */}
            {data.Status != 'Failed' ? 
            <TimelineItem>
                <TimelineOppositeContent 
                sx={{ m: '20px 0' }}
                align="right"
                color="text.secondary"
                >
                {data.InitiatedAt}
                </TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineDot 
                color='success'> 
                    <DoneTwoToneIcon  fontSize="large"/> 
                </TimelineDot>
                <TimelineConnector sx={{ 
                    bgcolor: data.Status != "In_Progress" ? "success.main" : "", 
                    width: "3px" }} 
                />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '20px', px: 2 }}>
                <Typography variant="h6" component="span">
                    Order Initiated
                </Typography>
                <Typography>Payment Confirmed.</Typography>
                <Typography>By {data.MerchantName}</Typography>
                </TimelineContent>
            </TimelineItem>
            : null}

            {/* Order In progress */}
            {data.Status == 'In_Progress' ? 
            <TimelineItem>
                <TimelineOppositeContent 
                sx={{ m: '20px 0' }}
                align="right"
                color="text.secondary"
                >
                {data.EstimatedDate}
                </TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineDot > 
                    <DoneTwoToneIcon  fontSize="large"/> 
                </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ py: '20px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Estimated Settlement Date
                    </Typography>
                    <Typography> Estimated date of receiving the commodity in India. </Typography>
                    <Typography>By {data.MerchantName}</Typography>
                </TimelineContent>
            </TimelineItem>
            : null}

            {/* Order Completed  */}
            {data.Status == 'Completed' || data.Status == 'Reversed' ? 
            <TimelineItem>
                <TimelineOppositeContent 
                sx={{ m: '20px 0' }}
                align="right"
                color="text.secondary"
                >
                {data.EstimatedDate}
                </TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineDot color='success'> 
                    <DoneTwoToneIcon  fontSize="large"/> 
                </TimelineDot>
                {data.Status == 'Reversed' ?
                    <TimelineConnector sx={{ bgcolor: "success.main", width: "3px" }} /> : null
                }
                </TimelineSeparator>
                <TimelineContent sx={{ py: '20px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Delivery Completed
                    </Typography>
                    <Typography> Commodity Received by the users in India.</Typography>
                    <Typography>From {data.MerchantName}</Typography>
                </TimelineContent>
            </TimelineItem>
            : null}

            {/* Order Reversal Ticket Raised  */}
            {data.Status == 'Reversed' ? 
            <TimelineItem>
                <TimelineOppositeContent 
                sx={{ m: '20px 0' }}
                align="right"
                color="text.secondary"
                >
                {data.ReversalIssueDate}
                </TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineDot color='warning'> 
                    <DoneTwoToneIcon  fontSize="large"/> 
                </TimelineDot>
                {data.Status == 'Reversed' ?
                    <TimelineConnector sx={{ bgcolor: "warning.main", width: "3px"}} /> : null
                }
                </TimelineSeparator>
                <TimelineContent sx={{ py: '20px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Reversal Requested
                    </Typography>
                    <Typography> Users raised a reversal ticket for their commodity.</Typography>
                </TimelineContent>
            </TimelineItem>
            : null}

            {/* Order Reversal Completed  */}
            {data.Status == 'Reversed' ? 
            <TimelineItem>
                <TimelineOppositeContent 
                sx={{ m: '20px 0' }}
                align="right"
                color="text.secondary"
                >
                {data.ReversalCompletionDate}
                </TimelineOppositeContent>
                <TimelineSeparator>
                <TimelineDot color='warning'> 
                    <DoneTwoToneIcon  fontSize="large"/> 
                </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ py: '20px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Reversal Completed
                    </Typography>
                    <Typography> Commodity returned and buyer was initiated with a refund.</Typography>
                </TimelineContent>
            </TimelineItem>
            : null}
        </Timeline>
    </Box>
    
  );
}
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors')

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors())

app.get('/transactiondetails/:id', async (req, res) =>{
    const transactionId = req.params.id;
    fs.readFile(path.join(__dirname, './seeds/TransactionRecords.json'), 'utf8', async (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        const transactions = JSON.parse(data);
        const details = await transactions.find(row => row.TransactionID == transactionId);
        res.json(details);
    });
})

app.get('/getnames', (req, res) => {
  fs.readFile(path.join(__dirname, './seeds/TransactionRecords.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    try {
      const transactions = JSON.parse(data);
      const names = Array.from(new Set(transactions.map(transaction => transaction.MerchantName)));
      // console.log(names);
      res.json(names);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
});


app.get('/transactions', (req, res) => {
  fs.readFile(path.join(__dirname, './seeds/TransactionRecords.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const transactions = JSON.parse(data);
    res.json(transactions);
  });
});

app.get('/getchart/:merchantname', (req, res) => {
  const merchantname = req.params.merchantname;
  fs.readFile(path.join(__dirname, './seeds/TransactionRecords.json'), 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const rows = JSON.parse(data);
    const transactions = rows.filter((row) => row.MerchantName == merchantname || "Grant PLC");
    const statusTotals = {
      "Completed": new Array(12).fill(0),
      "Failed": new Array(12).fill(0),
      "In_Progress": new Array(12).fill(0),
      "Reversed": new Array(12).fill(0)
      };
  
      const statusMapping = {
          "Completed": 0,
          "Failed": 1,
          "In_Progress": 2,
          "Reversed": 3
      };
  
      transactions.forEach(transaction => {
          const status = transaction.Status;
          const amount = parseFloat(transaction.Amount.replace("₹ ", "").replace(",", ""));
          const monthIndex = parseInt(transaction.InitiatedAt.split("/")[1]) - 1;
          
          statusTotals[status][monthIndex] += amount;
      });
      
      const o = [];
      for (const status in statusTotals) {
          o.push({
              label: status,
              data: statusTotals[status]
          });
      }
      // console.log(o);
    res.json(o);
  });
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

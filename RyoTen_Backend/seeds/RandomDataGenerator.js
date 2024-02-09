const fs = require('fs');
const casual = require('casual');
const RandomDateGenerator = require('random-date-generator');

// Provided list of merchant names
const merchantNames = [
    "Gerlach Group", "Frami LLC", "Wiegand LLC", "Hirthe and Sons", "Grant PLC",
    "Altenwerth PLC", "Morar LLC", "Wiegand Group", "Aufderhar Inc", "Reilly Inc",
    "Kertzmann and Sons", "Abshire PLC", "Cassin and Sons", "Lakin Group", "Bechtelar Inc",
    "Wilderman LLC", "Pfannerstill LLC", "McCullough Inc", "Cartwright Group", "Wilkinson Inc",
    "Parker Group", "Daniel Group", "Okuneva LLC", "Hackett LLC", "Gulgowski LLC"
];

// Function to generate a random transaction object
function generateRandomTransaction() {
    const randomID = casual.uuid; // Random UUID
    const randomTransactionID = casual.uuid; // Random alphanumeric Transaction ID
    let randomMerchantName;
    if (casual.coin_flip) {
        // Higher probability for some merchant names to repeat
        randomMerchantName = casual.random_element([
            "Gerlach Group", "Frami LLC", "Wiegand LLC", "Hirthe and Sons", "Grant PLC",
            "Altenwerth PLC", "Morar LLC", "Wiegand Group", "Aufderhar Inc", "Reilly Inc",
            "Kertzmann and Sons"
        ]);
    } else {
        randomMerchantName = casual.random_element(merchantNames);
    }
    const randomAmount = `₹ ${casual.double(1000000, 10000000).toFixed(2)}`; // Random amount
    const statuses = ['In_Progress', 'Completed', 'Reversed', 'Failed']; // List of possible statuses
    const randomStatus = casual.random_element(statuses); // Random status

    // Generate dates within the specified range
    const initiatedAt = RandomDateGenerator.getRandomDateInRange(new Date('2023-01-01'), new Date('2023-12-31'));
    const lastUpdatedAt = RandomDateGenerator.getRandomDateInRange(initiatedAt, new Date('2023-12-31'));

    let reversalIssueDate = null, reversalCompletionDate = null;
    let estimatedDate = null, completionDate = null;

    if(randomStatus !== 'Failed'){
      estimatedDate = RandomDateGenerator.getRandomDateInRange(lastUpdatedAt, new Date('2023-12-31'));
      completionDate = RandomDateGenerator.getRandomDateInRange(estimatedDate, new Date('2023-12-31'));
    }

    if (randomStatus === 'Reversed') {
        reversalIssueDate = RandomDateGenerator.getRandomDateInRange(initiatedAt, completionDate);
        reversalCompletionDate = RandomDateGenerator.getRandomDateInRange(reversalIssueDate, new Date('2023-12-31'));
    }

    return {
        "id": randomID,
        "TransactionID": randomTransactionID,
        "MerchantName": randomMerchantName,
        "Amount": randomAmount,
        "Status": randomStatus,
        "InitiatedAt": initiatedAt.toLocaleDateString('en-GB'),
        "LastUpdatedAt": lastUpdatedAt.toLocaleDateString('en-GB'),
        "EstimatedDate": estimatedDate ? estimatedDate.toLocaleDateString('en-GB') : null,
        "CompletionDate": completionDate ? completionDate.toLocaleDateString('en-GB') : null,
        "ReversalIssueDate": reversalIssueDate ? reversalIssueDate.toLocaleDateString('en-GB') : null,
        "ReversalCompletionDate": reversalCompletionDate ? reversalCompletionDate.toLocaleDateString('en-GB') : null
    };
}

// Function to generate multiple random transactions
function generateRandomTransactions(numTransactions) {
    const transactions = [];
    for (let i = 0; i < numTransactions; i++) {
        transactions.push(generateRandomTransaction());
    }
    return transactions;
}

// Generate 1000 random transactions
const numTransactions = 1000;
const randomTransactions = generateRandomTransactions(numTransactions);

// Write generated transactions to a file
const fileName = './TransactionRecords.json';
fs.writeFile(fileName, JSON.stringify(randomTransactions, null, 2), err => {
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log(`File "${fileName}" created successfully.`);
    }
});

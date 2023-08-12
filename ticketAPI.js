const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Sample data of 5 people
const people = [
  { id: '#1', name: 'Dinesh', assignedTickets: [] },
  { id: '#2', name: 'Vignesh', assignedTickets: [] },
  { id: '#3', name: 'Sathish', assignedTickets: [] },
  { id: '#4', name: 'Ganesh', assignedTickets: [] },
  { id: '#5', name: 'Santhosh', assignedTickets: [] }
];

// variables to keep track of ticket IDs and current assignment index
let ticketId = 1;
let currentAssigneeIndex = 0;

// Middleware to parse JSON body
app.use(bodyParser.json());

//Get method  to show the data
app.get('/', (req, res) => {
    res.status(200).json(people);
});
// POST method to create a new ticket
app.post('/ticket', (req, res) => {
  const { user_id, issue } = req.body;

  if (!user_id || !issue) {
    return res.status(400).json({ message: 'Bad request!.user_id and issue are required', success: false, data: null });
  }

  const assignedTo = people[currentAssigneeIndex].id;
  people[currentAssigneeIndex].assignedTickets.push(ticketId);

  // Round Robin assignment
  currentAssigneeIndex = (currentAssigneeIndex + 1) % people.length;
  
  const ticket = {
    ticket_id: ticketId.toString(),
    issue_description: issue,
    assigned_to: assignedTo,
    raised_by: user_id
    
  };

  ticketId++;

  res.status(201).json({ message: 'Ticket successfully created', success: true, data: ticket });
});

// server port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


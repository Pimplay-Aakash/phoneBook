// const express = require("express")

// const app = express()

// const port = 3000

// app.listen(port,() => {console.log("listening at ", port);})

const mongoose = require('mongoose');

// Connect to MongoDB

const url = 'mongodb+srv://shadowkey60:LkGhrkKrRWU2V1W2@phone.euqses1.mongodb.net/?retryWrites=true&w=majority&appName=phone'
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});
mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Define a Contact Schema
const ContactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String
});

const Contact = mongoose.model('Contact', ContactSchema);

// Express setup and routes go here


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Add CORS middleware
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// POST endpoint to add a new contact
app.post('/contacts', (req, res) => {
  const newContact = new Contact(req.body);
  newContact.save()
    .then(contact => res.json(contact))
    .catch(err => res.status(400).json('Error: ' + err));
});

// GET endpoint to fetch all contacts
app.get('/contacts', (req, res) => {
  Contact.find()
    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json('Error: ' + err));
});

const name = {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30,
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "NY",
      "zip": "12345"
    }
  }

app.get('/', (req, res) => {
    res.send(name)
});

// Server setup
const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));


// // Example of adding a new contact
// const addContact = async (contact) => {
//     try {
//       const response = await fetch('http://localhost:3000/contacts', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(contact),
//       });
//       const json = await response.json();
//       console.log('Contact added:', json);
//     } catch (error) {
//       console.error('Error adding contact:', error);
//     }
//   };
  
//   // Example of fetching contacts
//   const fetchContacts = async () => {
//     try {
//       const response = await fetch('http://localhost:3000/contacts');
//       const json = await response.json();
//       console.log('Contacts:', json);
//     } catch (error) {
//       console.error('Error fetching contacts:', error);
//     }
//   };
  
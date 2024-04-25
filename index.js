// const express = require("express")

// const app = express()

// const port = 3000

// app.listen(port,() => {console.log("listening at ", port);})

// for the creadentials
require("dotenv").config



const mongoose = require('mongoose');

// Connect to MongoDB

const url = process.env.MONGODB_URI
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

  app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal Server Error' });
});

// Set default Content-Type
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});


// // POST endpoint to add a new contact
// app.post('/contacts', (req, res) => {
//   const newContact = new Contact(req.body);
//   newContact.save()
//     .then(contact => res.json(contact))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// // POST endpoint to add a new contact
// app.post('/contacts', (req, res) => {
//   if(Array.isArray(req.body)) {
//     // If the request body is an array of objects, insert multiple contacts
//     Contact.insertMany(req.body)
//       .then(contacts => res.json(contacts))
//       .catch(err => res.status(400).json('Error: ' + err));
//   } else {
//     // If the request body is a single object, insert a single contact
//     const newContact = new Contact(req.body);
//     newContact.save()
//       .then(contact => res.json(contact))
//       .catch(err => res.status(400).json('Error: ' + err));
//   }
// });

// POST endpoint to add a new contact or multiple contacts
app.post('/contacts', (req, res) => {
  const requestData = req.body;
  if (Array.isArray(requestData)) {
    // If the request body is an array of objects, insert multiple contacts
    Contact.insertMany(requestData)
      .then(contacts => res.json(contacts))
      .catch(err => res.status(400).json({ error: 'Error adding contacts', details: err }));
  } else {
    // If the request body is a single object, insert a single contact
    const newContact = new Contact(requestData);
    newContact.save()
      .then(contact => res.json(contact))
      .catch(err => res.status(400).json({ error: 'Error adding contact', details: err }));
  }
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


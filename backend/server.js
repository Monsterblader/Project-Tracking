const bodyParser = require('body-parser');
var cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');

const Data = require('./data');

const env = dotenv.config();
const API_PORT = process.env.API_PORT;
const app = express();
app.use(cors());
const router = express.Router();

// This is our MongoDB database.
const dbRoute = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSW}@${process.env.DB_HOST}`;

// Connects our back-end code with the database.
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the the database'));

// Checks if connection with the database is successful.
db.on('error', console.error.bind(console, 'MongoDB connection error;'));

// (Optional) only made for logging and bodyParser, parses the request body to be a readable json format.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// This is our get method.
// This method fetches all available data in our database.
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// This is our update method.
// This method overwrites existing data in our database.
router.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findByIdAndUpdate(id, update, (err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// This is our delete method.
// This method removes existing data from our database.

router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// This is our create method.
// This method adds new data to our database.
router.post('/putData', (req, res) => {
  let data = new Data();

  const { id, item } = req.body;

  if ((!id && id !== 0) || !item) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.item = item;
  data.id = id;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// Append /api for our http requests.
app.use('/api', router);

// Launch our backend into a port.
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));

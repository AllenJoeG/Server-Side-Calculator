const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

const calculationsArray = [];

//POST Route receiving to-be-calculated from client
app.post('/calculate', (req, res) => {
  calculationsArray.push(req.body);
  console.log(calculationsArray);
  
  res.sendStatus(201);
});


app.listen(PORT, () => {
  console.log ('Server is running on port', PORT)
})
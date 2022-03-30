const express = require('express');
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const cors = require('cors');

// Obtaining app and adding plugins
const app = express();
app.use(bodyParser.json());
app.use(cors());
//Routes
const usersRoute = require('./routes/users');
const questionsRoute = require('./routes/questions');

app.use('/api/users', usersRoute);
app.use('/api/questions', questionsRoute);

// Starting server
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

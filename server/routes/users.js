const express = require('express');
const router = express.Router();
const { db } = require('../config/Conection');

//Endpoint to get all users
router.get('/', (req, res) => {
  console.log(req);
  const sqlSelect = 'SELECT * FROM users';
  db.query(sqlSelect, (err, results) => {
    if (err) {
      res.end(err.code + ': ' + err.sqlMessage);
      return;
    }

    res.send(results);
    console.log('GET request succesful!');
  });
  //Results array contain all users
});

//Endpoint to get the best 10 users scores
router.get('/records', (req, res) => {
  const sqlSelect = 'SELECT * FROM users ORDER BY score DESC LIMIT 10';
  db.query(sqlSelect, (err, results) => {
    if (err) {
      res.end(err.code + ': ' + err.sqlMessage);
      return;
    }
    res.status(200).send(results);
    console.log('GET request succesful!');
  });
  //Results array contain all ten best records users
});

//Endpoint to insert one new user
router.post('/insert', (req, res) => {
  const { name } = req.body;
  nameIsValid(name).then((isValid) => {
    if (!isValid) return res.send({ insertId: -1 });
    const sqlInsert = 'INSERT INTO users (name) VALUES (?)';
    db.query(sqlInsert, [name], (err, results) => {
      if (err) {
        res.end(err.code + ': ' + err.sqlMessage);
        return;
      }
      res.status(201).send(results);
      console.log('User inserted correctly with ID: ' + results.insertId);
    });
  });
});

//This method check if the user to create already exists or not
const nameIsValid = (name) => {
  return new Promise((resolve, reject) => {
    const sqlSelect = 'SELECT * FROM users WHERE name=?';
    db.query(sqlSelect, [name], (err, results) => {
      if (err) {
        res.end(err.code + ': ' + err.sqlMessage);
        reject('Failed to conection');
      }
      if (results.length == 0) resolve(true);
      resolve(false);
    });
  });
};

//Endpoint to update score of the user
//It's developed to search the user that is going to be update by his name, but i want to search him by his id
router.put('/update-score', (req, res) => {
  const { id, score } = req.body;
  const sqlInsert = 'UPDATE users SET score=? WHERE id=?';
  db.query(sqlInsert, [score, id], (err, results) => {
    if (err) {
      res.end(err.code + ': ' + err.sqlMessage);
      return;
    }
    res.status(201).send(results);
    console.log('Score udpdated correctly.');
  });
});

module.exports = router;

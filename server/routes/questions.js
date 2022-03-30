const express = require('express');
const router = express.Router();
const { db } = require('../config/Conection');

router.get('/', (req, res) => {
  console.log(req);
  let sqlSelect = ``;
  for (let i = 1; i <= 5; i++) {
    sqlSelect += `SELECT q.id, q.statement, o.opt_one, o.opt_two, o.opt_three, o.opt_four, o.opt_correct, c.name AS Category, t.name AS Topic FROM questions q `;
    sqlSelect += `INNER JOIN questions_options o ON q.id_options = o.id INNER JOIN categories c ON q.id_category = c.id INNER JOIN topics t ON q.id_topic = t.id
      WHERE c.id = ${i} ORDER BY rand() LIMIT 1;`;
  }
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.end(err.code + ': ' + err.sqlMessage);
      return;
    }
    console.log(result);
    const questions = result.flat();
    res.status(200).send(questions);
  });
});

module.exports = router;

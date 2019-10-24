const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const SELECT_ALL_BOOKS_QUERY = "SELECT * FROM BOOKS";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "sys",
  multipleStatements: true
});

app.use(cors());

function handleDisconnect() {
  console.log("handleDisconnect()");
  connection.destroy();
  connection = mysql.createConnection(connection);
  connection.connect(function(err) {
    if (err) {
      console.log(" Error when connecting to db  (DBERR001):", err);
      setTimeout(handleDisconnect, 1000);
    }
  });
}

connection.connect(function(err) {
  if (err) {
    console.log("Connection is asleep (time to wake it up): ", err);
    setTimeout(handleDisconnect, 1000);
    handleDisconnect();
  }
});

app.get("/books/add", (req, res) => {
  const {
    // authors,
    college,
    date,
    semester,
    title,
    subject,
    condition,
    userid
  } = req.query;
  const INSERT_BOOK_QUERY = `insert into BOOKS (userid , subject , semester , title , college , date , bookCondition ) values(${userid} , "${subject}" , ${semester} , "${title}" , "${college}" , "${date}" , "${condition}")`;
  // var INSERT_AUTHORS = "";
  // authors.forEach(author => {

  // });
  connection.query(INSERT_BOOK_QUERY, (err, results) => {
    if (err) {
      console.log(err);
      return res.send(err);
    } else {
      console.log(results);
      res.send(results);
    }
  });
});

app.get("/authors", (req, res) => {
  const { book_id, author } = req.query;
  const INSERT_AUTHOR_QUERY = `insert into AUTHORS values(${book_id} , "${author}")`;
  connection.query(INSERT_AUTHOR_QUERY, (err, results) => {
    if (err) {
      console.log(err);
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
});

app.get("/", (req, res) => {
  res.send("hello from books server");
});

app.get("/history", (req, res) => {
  const { book_id } = req.query;
  var d = new Date().toISOString().slice(0, 10);
  console.log(`INSERT INTO HISTORY values(${book_id} , "${d}")`);
  connection.query(
    `INSERT INTO HISTORY VALUES(${book_id} , "${d}")`,
    (err, results) => {
      if (err) {
        console.log(err);
        return res.send(err);
      } else {
        console.log(results);
        return res.json(results);
      }
    }
  );
});

app.get("/user", (req, res) => {
  const { usn } = req.query;
  connection.query(`SELECT * FROM USERS WHERE usn=${usn}`, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
});

app.get("/booksilent", (req, res) => {
  const { user_id } = req.query;
  connection.query(
    `select * from BOOKS where userid=${user_id}`,
    (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json(results);
      }
    }
  );
});

app.get("/books", (req, res) => {
  if (req.query.whereClause === undefined) {
    connection.query(SELECT_ALL_BOOKS_QUERY, (err, results) => {
      if (err) {
        return res.send(err);
      } else {
        return res.json(results);
      }
    });
  } else {
    const whereClause = req.query.whereClause;
    connection.query(
      `${SELECT_ALL_BOOKS_QUERY} ${whereClause}`,
      (err, results) => {
        if (err) {
          return res.send(err);
        } else {
          return res.json(results);
        }
      }
    );
  }
});

app.get("/signup", (req, res) => {
  console.log(req.query);
  const { name, password, usn, semester, college } = req.query;
  const qr = `INSERT INTO USERS VALUES(${usn} , "${password}" , "${name}" , "${college}" , ${semester})`;
  connection.query(qr, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      console.log(res);
      return res.json(results);
    }
  });
});

app.get("/login", (req, res) => {
  const { usn, password } = req.query;
  const qr = `SELECT * FROM USERS WHERE usn="${usn}" and password="${password}"`;
  connection.query(qr, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      console.log(res);
      return res.json(results);
    }
  });
});

app.listen(4000, () => {
  console.log("Server up!!");
});

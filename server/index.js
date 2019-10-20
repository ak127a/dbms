const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

const SELECT_ALL_BOOKS_QUERY = "SELECT * FROM BOOKS";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "sys"
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
  const { id, author } = req.query;
  const INSERT_BOOK_QUERY = `insert into BOOKS values("${id}" , "${author}")`;
  connection.query(INSERT_BOOK_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      res.send(results);
    }
  });
});

app.get("/", (req, res) => {
  res.send("hello from books server");
});

app.get("/books", (req, res) => {
  connection.query(SELECT_ALL_BOOKS_QUERY, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json(results);
    }
  });
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

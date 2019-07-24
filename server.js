const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 4000;
const mysql = require("mysql"); // need to establish

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Starting our server
app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});

//Connect to mySQl
const mysqlConnection = mysql.createConnection({
  host: "10.9.3.218",
  user: "TWStudent",
  password: "TechWorks!",
  database: "employeedb", // which DB? there are many
  multipleStatements: true // we will send multiple statements in one query
});

// response if there is an erorr, such as wrong log in or invaild link
mysqlConnection.connect(err => {
  if (!err) {
    console.log("DB connection succeeded!");
  } else {
    console.log(
      "DB connection failed. Error",
      JSON.stringify(err, undefined, 2)
    );
  }
});

// routes
app.get("/employee", (req, res) => {
  // second part is the call back function
  mysqlConnection.query("SELECT * FROM employee", (err, rows, field) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

app.get("/employee/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM employee WHERE EmpID =?",
    [req.params.id],
    (err, rows, field) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

app.delete("/employee/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM employee WHERE EmpID =?",
    [req.params.id],
    (err, rows, field) => {
      if (!err) res.send("FIRED employee!");
      else console.log(err);
    }
  );
});

app.delete("/employee/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM employee WHERE EmpID =?",
    [req.params.id],
    (err, rows, field) => {
      if (!err) res.send("FIRED employee!");
      else console.log(err);
    }
  );
});

// // Routes
// app.get('/api/students', (req, res) => {
//   const students = [
//     { id: 1, firstName: 'Captain', lastName: 'fancy' },
//     { id: 2, firstName: 'John', lastName: 'buttercup' },
//     { id: 3, firstName: 'Dusty', lastName: 'Trail' },
//   ];
//   res.json(students);
// });

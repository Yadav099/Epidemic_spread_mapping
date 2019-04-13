const express = require("express");
const mysql = require("mysql");
var bodyParser = require("body-parser");
const path = require("path");
const app = express();
//const arr = [];
const session = require("express-session");
const parser = require("cookie-parser");

app.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, "../", "portal", "login", "login.html"));
});

app.use(express.static("../public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(parser());

//create connection
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql"
});

app.post("/searchDisease", function(req, res) {
  const d_name = req.body.d_name;
  let sql = `select * from epidemic where name='${d_name}';`;
  let sql2 = `select H.lat, H.lon
  from hospital H, epidemic E, connector C
  where H.h_id = C.h_id and
  E.d_id = C.d_id and
  E.name='${d_name}';`;

  db.query(sql, (err, result) => {
    if (err) {
      res.json({ error: "Oops!" });
    } else {
      db.query(sql2, (err2, res2) => {
        if (err2) res.json({ error: "Oops2!" });
        else res.json({ success: result, position: res2 });
        console.log(res2);
      });
    }
  });
});

app.post("/signin", function(req, res) {
  const { h_id, pass } = req.body;
  let sql = `select * from hospital where h_id=${h_id *
    1} and h_password=${pass * 1}; `;
  db.query(sql, (err, result) => {
    console.log(result);
    if (err) res.json({ error: "Oops!something went wrong!!" });
    else if (result.length == 0)
      res.json({ error: "Invalid username or pwd!" });
    else {
      res.cookie("h_id", h_id);
      res.json({ success: "jai" });
    }
  });
});

// app.use(function(req, res, next) {
//   db.query()
//   console.log(req.cookies);
//   const h_id = req.cookies;
// });

app.get("/admin", function(req, res) {
  console.log(req.cookies);
  res.sendFile(path.join(__dirname, "../", "portal", "portal.html"));
  //console.log(arr);
});

app.post("/submit", function(req, res) {
  console.log(req.body);
  const {
    name,
    affectedPpl,
    LifeCount,
    precautions,
    facilityToTreat,
    contagious,
    spreadType,
    Status
  } = req.body;
  let sql = `INSERT INTO epidemic(name, affected, death, precautions, facility, contagious, SpreadType, Dstatus) VALUES ('${name}', ${affectedPpl}, ${LifeCount}, '${precautions}', '${facilityToTreat}', '${contagious}', '${spreadType}' ,'${Status}');`;
  console.log(sql);
  db.query(sql, (err, result) => {
    console.log(err);
    console.log(result);
  });
});

app.get("/client", function(req, res) {
  console.log(req.cookies);
  res.sendFile(path.join(__dirname, "../", "client", "client.html"));
  //console.log(arr);
});

const port = 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

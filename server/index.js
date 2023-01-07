const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3005;

//Mysql connection
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "587548",
    database: "mean"
});

conn.connect((err)=>{
    if (err) throw err;
    console.log('Connected');
})

//Init server
app.listen(port, ()=>{
    console.log('Server is running on http://localhost:'+port);
});


//get requests
app.get("/", (req,res)=>{
   let sql = "select * from users";
   conn.query(sql, (err,rows)=>{
      if (err) throw err;
      res.send(rows);
       console.log(rows);
   });
});


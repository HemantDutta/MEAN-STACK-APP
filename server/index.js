const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bp = require('body-parser');
const app = express();
const port = 3005;

//CORS
app.use(cors());

//JSON
app.use(express.json());

//Body Parser
app.use(bp.urlencoded({extended: true}));
app.use(bp.json());

const corsOptions = {
    origin: "*",
    methods: "get",
    optionsSuccessStatus: 200
}


//Mysql Config
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "587548",
    database: "mean"
});


//Mysql Connection
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
       res.end();
   });
});


//post requests
app.post("/add", (req,res)=>{
    res.status(200)
    res.setHeader('Content-Type', 'application/json');
    let data = req.body;

    let insertSQL = `insert into users values(${data.id}, '${data.name}', '${data.category}', ${data.rating})`;

    conn.query(insertSQL, (err)=>{
       if (err) throw err;
       res.send('Entry Inserted!');
       res.end();
    });
});


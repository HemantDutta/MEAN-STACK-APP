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
   let selectSQL = `select * from users`;

   conn.query(selectSQL, (err,rows)=>{
      if (err) throw err;

      //send to frontend
      res.send(rows);
      console.log(rows);
      res.end();
   });
});


//post requests
app.post("/add", (req,res)=>{
    res.status(200);
    res.setHeader('Content-Type', 'application/json');

    //Data Fetch from frontend
    let data = req.body;
    console.log(data);

    //Insert Query
    let insertSQL = `insert into users values(${data.id}, '${data.name}', '${data.category}', ${data.rating})`;

    conn.query(insertSQL, (err)=>{
       if (err) throw err;
       res.send('Entry Inserted!');
       res.end();
    });
});

//Update requests
app.post('/update', (req,res)=>{
   res.status(200);
   res.setHeader('Content-Type', 'application/json');

   //Front end data
   let data = req.body;
    console.log(data);

   let updateSQL = `update users set name='${data.name}', category='${data.category}', rating=${data.rating} where id = ${data.id}`;

   conn.query(updateSQL, (err)=>{
       if (err) throw err;

       res.send('Updated');
       res.end();
   })
});

//Delete
app.post("/delete", (req,res)=>{
    res.status(200);
    res.setHeader('Content-Type', 'application/json');

    //Front ENd Data
    let data = req.body;

    let deleteSQL = `delete from users where id=${data.id}`;

    //Mysql Query
    conn.query(deleteSQL, (err)=>{
        if (err) throw err;

        res.send('Deleted');
        res.end();
    })
});


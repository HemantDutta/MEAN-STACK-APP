const express = require('express');
const app = express();
const port = 3005;

//Init server
app.listen(port, ()=>{
    console.log('Server is running on http://localhost:'+port);
})


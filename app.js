const express = require('express');
const app = express();

app.get('/', (req, res) => res.send("hi from here"));


const PORT = 3000;
app.listen(PORT, () => console.log("Server started"));
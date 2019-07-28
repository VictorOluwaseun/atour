const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');

const app = express();

//1. Middlewares
app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log("...from middleware");
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/v1/tours', tourRouter);


const PORT = 3000;
app.listen(PORT, () => console.log("Server started"));
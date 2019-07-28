const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const tours = JSON.parse(fs.readFileSync(path.join(__dirname, "dev-data/data", "tours-simple.json"), 'utf-8'));

app.use(express.json());

app.get('/', (req, res) => res.send("hi from here"));

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
});

app.get('/api/v1/tours/:id', (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tour
        }
    });
});

app.post('/api/v1/tours', (req, res) => {
    const newId = tours.length;
    const newTour = Object.assign({
        id: newId
    }, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server started"));
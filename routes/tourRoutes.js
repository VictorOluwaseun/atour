//tour routers
const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

const tours = JSON.parse(fs.readFileSync(path.join(__dirname, "./../dev-data/data", "tours-simple.json"), 'utf-8'));

const getAllTours = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    });
};

const getTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    res.status(200).json({
        status: "success",
        requestedAt: req.requestTime,
        data: {
            tour
        }
    });
};

const createTour = (req, res) => {
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
};

const updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<updated tour>'
        }
    });
};

const deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    });
};


router
    .route('/')
    .get(getAllTours)
    .post(createTour);

router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

module.exports = router;
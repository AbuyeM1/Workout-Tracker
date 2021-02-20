const router = require("express").Router();
const User = require("../models/userModel.js");

router.get("/api/workouts/range", function (req, res) {
    User.find().sort({ day: -1 }).limit(7).then(function (data) {
        res.json(data)
    })
});

router.get("/api/workouts", function (req, res) {
    User.aggregate([
        {
            $addFields: {
                totalDuration: {$sum: "$exercise.duration" }
            } 
        }
    ]).then(function (data) {
        res.json(data)
    })
});

router.post("/api/workouts", function (req, res) {
    console.log(req.body);
    User.create(req.body).then(function (workout) {
        return res.json(workout)
    }).catch(function (err) {
        res.json(err);
    })
});

router.put("/api/workouts/:id", function (req, res) {

    console.log("Here are the body", req.body);
    User.findByIdAndUpdate(req.params.id, { exercises: req.body }).then(function (workout) {
        return res.json(workout)
    }).catch(function (err) {
        res.json(err);
    })
});

module.exports = router;
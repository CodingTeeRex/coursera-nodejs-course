const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require("../authenticate");

const Promos = require('../models/promos');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route("/")
.get((req, res, next) => {
    Promos.find({}).then((promos) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promos);
    }, (err) => next(err)).catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promos.create(req.body).then((promo) => {
        console.log("promo Created ", promo);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err)).catch((err) => next(err));
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /promos");
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promos.remove({}).then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err)).catch((err) => next(err));
});

promoRouter.route("/:promoId")
.get((req, res, next) => {
    Promos.findById(req.params.promoId).then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err)).catch((err) => next(err));
})
.post(authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on /promos/" + req.params.promoId);
})
.put(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promos.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, { new: true }).then((promo) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promo);
    }, (err) => next(err)).catch((err) => next(err));
})
.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promos.findOneAndRemove(req.params.promoId).then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err)).catch((err) => next(err));
});

module.exports = promoRouter;
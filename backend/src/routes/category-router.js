import express, {response} from 'express';
import {Category} from "../models/category.js";


export const router = new express.Router();

/* =============================================================== CREATE =============================================================== */

router.post('/categories', (req,res, next) => {
    const category = new Category(req.body);
    category
        .save()
        .then(() =>
            res.json(category))
        .catch(next);
});

/* =============================================================== READ =============================================================== */

router.get('/categories', (req, res, next) => {
    Category.find({})
        .then(category => {
            res.json(category);
        })
        .catch(next);
});


router.get('/categories/:id', (req, res, next) => {
    Category.findById(req.params.id)
        .then((category) => res.json(category),
        )
        .catch(next);
});

/* =============================================================== UPDATE =============================================================== */

router.patch('/categories/:id', (req, res, next) =>{
    Category.updateOne({ _id: req.params.id}, req.body)
        .then(() => res.json(req.body))
        .catch(next)
});

/* =============================================================== DELETE =============================================================== */

router.delete('/categories/:id',(req, res, next) => {
    Category.deleteOne({ _id: req.params.id})
        .then(() => res.json({
                message: 'CategoryCreate successfully deleted',
                _id: req.params.id
            }),
        )
        .catch(next);
});

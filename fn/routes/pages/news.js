const express = require('express');
const { newsValidationRules, validate } = require('../../middleware/validator');
const { auth, authorize } = require('../../middleware/auth');
const {
    createNews,
    getNews,
    getOneNews,
    updateNews,
    deleteNews,
} = require('../../controllers/pages/news');

const router = express.Router();

router
    .route('/')
    .get(getNews)
    .post(newsValidationRules(), validate, createNews);

router
    .route('/:id')
    .get(auth, authorize('admin', 'user'), getOneNews)
    .put(auth, authorize('admin'), updateNews)
    .delete(auth, authorize('admin'), deleteNews);

module.exports = router;

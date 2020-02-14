const express = require('express');
const ArticleModel = require('../../models/Article');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const article = await ArticleModel.find();

        return res.send(article);
    } catch (err) {
        return console.log(err);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params.id;
    try {
        const article = await ArticleModel.findById(id);
        if (!article) {
            res.status(404).json({ msg: 'article does not exist' });
        }
        return res.send('Single article get OK');
    } catch (err) {
        return console.log(err);
    }
});

router.post('/', async (req, res) => {
    
    try {
        return res.send('Article POST OK');
    } catch (err) {
        return console.log(err);
    }
});

router.patch('/:id', async (req, res) => {
    try {
        return res.send('Article PATCH OK');
    } catch (err) {
        return console.log(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        return res.send('Article DELET OK');
    } catch (err) {
        return console.log(err);
    }
});

module.exports = router;

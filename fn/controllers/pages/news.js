const News = require('../../models/News');
const asyncHandler = require('../../middleware/async');
const ErrorResponse = require('../../utils/errorResponse');

const createNews = asyncHandler(async (req, res, next) => {
    const { title, text, newsImage, date, newsVideo, author, authorPhoto, } = req.body;
    const newNews = new News({
        title,
        text,
        date,
        newsImage,
        newsVideo,
        author,
        authorPhoto
    });
    await newNews.save();
    res.status(200).send(newNews);
});

const getNews = asyncHandler(async (req, res, next) => {
    let news = await News.find()
        .sort('-date')

    if (!news || news.length === 0) {
        return next(
            new ErrorResponse('News not found.', 404)
        );
    }
    res.status(200).send(news);
});


const getOneNews = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const oneNews = await Order.findById(id)

    if (!oneNews) {
        return next(
            new ErrorResponse('This news is not found.', 404)
        );
    }
    res.status(200).send(oneNews);
});

const updateNews = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { news } = req.body;
    const updatedNews = await News.findByIdAndUpdate(id, news);
    if (!updatedNews) {
        return next(
            new ErrorResponse('News not found.', 404)
        );
    }
    res.status(200).send(updatedNews);
});

const deleteNews = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const response = await News.findByIdAndDelete({ _id: id });
    if (!response) {
        return next(
            new ErrorResponse('News not found.', 404)
        );
    }
    res.status(200).send('News successfully deleted!');
});

module.exports = {
    createNews,
    getNews,
    getOneNews,
    updateNews,
    deleteNews,
};

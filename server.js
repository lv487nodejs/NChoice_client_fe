const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');

const auth = require('./api/middleware/auth');

const users = require('./api/routes/users/users');
const products = require('./api/routes/products/products');
const orders = require('./api/routes/orders/orders');
const articles = require('./api/routes/articles/articles');

const app = express();

connectDB();

app.use(morgan('dev'));
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use('/api/auth', auth);

app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/orders', orders);
app.use('/api/articles', articles);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

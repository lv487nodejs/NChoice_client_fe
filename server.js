const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');

const auth = require('./api/middleware/auth');

const users = require('./api/routes/users/users');
const products = require('./api/routes/products/products');
const catalogs = require('./api/routes/products/catalogs');

const app = express();

connectDB();

app.use(morgan('dev'));
app.use(morgan('common'));
app.use(morgan('short'));
morgan.token('body', (req, res) => console.log(JSON.stringify(req.body)));
app.use(morgan(' :method :url  :response-time '));
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use('/auth', auth);

app.use('/users', users);
app.use('/products', products);
app.use('/catalogs', catalogs);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

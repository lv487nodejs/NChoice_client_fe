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
app.use(morgan('common'))
app.use(morgan('short'))

// here custom token is created. instead of "body" you can use any object from "req" 
morgan.token('body',(req,res)=>{
    return console.log(JSON.stringify(req.body));
    
})
app.use(morgan(' :method :url  :body :response-time '))
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

app.use('/auth', auth);

app.use('/users', users);
app.use('/products', products);
app.use('/orders', orders);
app.use('/articles', articles);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

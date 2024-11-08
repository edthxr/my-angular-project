let express = require('express');
    path = require('path');
    mongoose = require('mongoose');
    cors = require('cors');
    bodyParser = require('body-parser');
    mongoDb = require('./database/db');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connected successfully !')
},error => {
    console.log('Database could not be connected : ' + error)
})

const bookRoute = require('./routes/book.routes')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());


// Static directory path
app.use(express.static(path.join(__dirname, 'dist/')));

// Base route
app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: 'dist/'
    });
});

// API root

app.use('/api', bookRoute)

// Port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// 404 Handler
app.use((req, res, next) => {
    next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
});
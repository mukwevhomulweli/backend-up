const express = require('express');
const cors = require("cors");
require('dotenv').config()
const database = require('./models')
const routes = require('./routes/userRoute')
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Welcome to the backend')
})
app.listen(PORT, () => {
    console.log(`Listening to port : ${PORT}`)
})

var corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

database.mongoose
    .connect(database.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((err) => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.use('/api/user', routes)
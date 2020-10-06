const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack.nofp8.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))
app.use(routes);

app.listen(3333);
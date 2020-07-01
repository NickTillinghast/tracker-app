require('./models/user');

const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('./middlewares/requireAuth');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');


const app = express();
// supposedly new version of node doesn't require parser

app.use(bodyParser.json());
// parser must be before use auth routes 

app.use(authRoutes);

const mongoUri = 'mongodb+srv://NickTillinghast:kinley082314@cluster0-hfig5.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
});
mongoose.connection.on('error', (err) => {
    console.log('Error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`your email: ${req.user.email}`);

});

app.listen(3000, () => {
    console.log('Listening on port 3000');
})
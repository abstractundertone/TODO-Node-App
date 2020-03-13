require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database   ' + db.name));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const routes = require('./routes/index')

const middlewares = [
  express.static(path.join(__dirname, 'public')),
  express.urlencoded({ extended: false })
]
app.use(middlewares)

app.use('/', routes)

app.listen(PORT, () => {
  console.log('Server Started at port' + PORT)
})
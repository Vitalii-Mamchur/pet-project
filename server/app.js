require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const chalk = require('chalk');
const routes = require('./routes');
const cors = require('cors');
const initDatabase = require('./startUp/initDatabase');
const path = require('path');
const app = express();

mongoose.set('strictQuery', false);

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use('/api/uploads', express.static('uploads'));
app.use('/api', routes);

const PORT = process.env.PORT || 8080;
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(
      path.join(__dirname, 'client')));

  const indexPath = path.join(__dirname, 'client', 'index.html');

  app.get('*', (req, res)=>{
    res.sendFile(indexPath);
  });
}
async function start() {
  try {
    mongoose.connection.once('open', () => {
      initDatabase();
    });
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(chalk.green(
        `MongoDB is connected.`));
    app.listen(PORT, () =>
      console.log(chalk.green(
          `The server is started on the port ${PORT}...`,
      )),
    );
  } catch (e) {
    process.exit(1);
  }
}

start();

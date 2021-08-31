//ToDo:
//1. Сделать так, чтобы сборка конечного проекта происходила в папку public


const express = require('express');
const app = express();
const path = require('path');
const rootRouter = require('./routes/index');
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
//Временное решение для авторизации
app.use((req, res, next) => {
  req.user = {
    _id: '6123ec22a2793408749689df'
  };
  next();
})
app.use('/', rootRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} port`);
});
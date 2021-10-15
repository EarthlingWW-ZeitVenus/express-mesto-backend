//ToDo:
//1. Сделать так, чтобы сборка конечного проекта происходила в папку public

//ToReview:
//"Попробуйте импользовать async/await..." - люблю эспериментировать
//и пробовать новое, но не на последней итерации, надеюсь понимаете
//и не в обиде...

const express = require('express');
const app = express();
const path = require('path');
const rootRouter = require('./routes/index');
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/errors');
const { errors } = require('celebrate');
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(cookieParser());
app.use('/', rootRouter);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT} port`);
});
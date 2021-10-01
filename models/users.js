const mongoose = require('mongoose');
const externalValidator = require('validator');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return externalValidator.isEmail(value);
      }
      // message: 'Передан некорректный адрес почты'
    }
  },
  password: {
    type: String,
    required: true,
    // minlength: 8
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто"
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Исследователь"
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png"
  },
});


userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then(user => {
      if(!user) {
        return Promise.reject(new Error('Неправвильные почта или пароль'));
      };
      return bcrypt.compare(password, user.password)
        .then(matched => {
          if(!matched) {
            return Promise.reject(new Error('Неправвильные почта или пароль'));
          };
          return user;
        });
  });
}


module.exports = mongoose.model('user', userSchema);
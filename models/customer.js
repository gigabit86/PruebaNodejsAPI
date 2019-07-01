var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerModel = new Schema({
    nombre: {
        type: String,
        uppercase: true
    },
    apellidos: {
        type: String,
        uppercase: true,
        required: true
    },
    empresa: {
        type: String,
        uppercase: true,
        required: true
    },
    email: {
        type: String,
        uppercase: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    create_at: { type: Date, default: Date.now }
});

CustomerModel.pre('findOneAndUpdate', async function (next, done) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (re.test(this._update.email)) {
        next();
    }
    else {
        this.options.runValidators = true;
        next();
    }
});

CustomerModel.path('email').validate(async (value) => {
    const emailCount = await mongoose.models.CustomerModel.countDocuments({ email: value });
    return !emailCount;
}, 'Email already exists');


CustomerModel.path('email').validate(async (value) => {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(value)
}, 'Error en formato de Email');

CustomerModel.plugin(require('mongoose-bcrypt'), {
    fields: ['password'],
    rounds: 6
});


module.exports = mongoose.model('CustomerModel', CustomerModel);


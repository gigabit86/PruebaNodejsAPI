var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CompanyModel = new Schema({
    nombre   : {
        type: String,
        uppercase: true,
        required: true
    }
});


module.exports = mongoose.model('CompanyModel', CompanyModel );
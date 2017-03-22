var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var passportLocalMongoose = require('passport-local-mongoose');

// define the User model schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already in use.']
    },
    username: {

        type: String,
        index: true,
        unique: [true, 'Username already in use.'],
        required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});



var options = ({missingPasswordError: "Wrong password"});

UserSchema.plugin(passportLocalMongoose, options);


module.exports = mongoose.model('User', UserSchema);
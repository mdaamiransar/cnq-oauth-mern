const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userId: 'String',
    username: 'String',
    picture: 'String'
});

mongoose.model('User', userSchema);
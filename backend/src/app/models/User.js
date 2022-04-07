const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

        username: {type: String, required: true, max: 10, unique: true},
        password: {type: String, required: true, min: 6},
        email: {type: String, required: true, max: 50, unique: true},
        fullname: {type: String, required: true},
        role_id: {type: String, required: true},
        department_id: {type: String, required: true},
        department_name: {type: String, default: "unknown"},
        role_name: {type: String, default: "Staff"},

    }, {timestamps: true}
)

module.exports = mongoose.model('User', UserSchema, 'users')

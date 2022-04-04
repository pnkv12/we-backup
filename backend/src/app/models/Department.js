const mongoose = require('mongoose')

const DepartmentSchema = new mongoose.Schema({

    name: {type: String, required: true},

}, {timestamps: true}
)

module.exports = mongoose.model('Department', DepartmentSchema, 'departments')
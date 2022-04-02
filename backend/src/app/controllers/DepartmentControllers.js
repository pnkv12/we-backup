const Department = require('../models/Department')

class DepartmentController {

    // [POST] /department
    async createDepart(req, res, next){

        try {
            const newDepart = new Department(req.body)
            const savedDepart = await newDepart.save()
            res.status(200).json(savedDepart)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PUT] /department/:id
    async updateDepart(req, res, next){

        try {
            const departId = req.params.id
            const depart = await Department.findById(departId)
            await depart.updateOne({ $set: req.body})
            const updatedDepart = await Department.findById(departId)
            res.status(200).json({
                message: "The department has been updated.",
                department: updatedDepart
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /department/:id
    async deleteDepart(req, res, next){

        try {
            const depart = await Department.findById(req.params.id)
            await depart.deleteOne()
            res.status(200).json({
                message: 'The department has been deleted.'
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /departments
    async getAllDepart(req, res, next){

        try {
            const depart = await Department.find({})
            res.status(200).json(depart)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /department/:id
    async getADepart(req, res, next){

        try {
            const depart = await Department.findById(req.params.id)
            res.status(200).json(depart)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new DepartmentController
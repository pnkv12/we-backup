const Role = require('../models/Role')

class RoleController {

    // [POST] /role
    async createRole(req, res, next){

        try {
            const newRole = new Role(req.body)
            const savedRole = await newRole.save()
            res.status(200).json(savedRole)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PUT] /role/:id
    async updateRole(req, res, next){

        try {
            const roleId = req.params.id
            const role = await Role.findById(roleId)
            await role.updateOne({ $set: req.body})
            const updatedRole = await Role.findById(roleId)
            res.status(200).json({
                message: "The role has been updated.",
                role: updatedRole
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /role/:id
    async deleteRole(req, res, next){

        try {
            const role = await Role.findById(req.params.id)
            await role.deleteOne()
            res.status(200).json({
                message: 'The role has been deleted.'
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /roles
    async getAllRole(req, res, next){

        try {
            const role = await Role.find({})
            res.status(200).json(role)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /role/:id
    async getARole(req, res, next){

        try {
            const role = await Role.findById(req.params.id)
            res.status(200).json(role)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new RoleController
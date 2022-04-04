const Category = require('../models/Category')
const Idea = require('../models/Idea')
class CategoryController {

    // [POST] /category/create
    async categoryCreate(req, res, next){

        try {
            const newCategory = new Category(req.body)
            const savedCategory = await newCategory.save()
            res.status(200).json(savedCategory)
            
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PUT] /category/update/:id
    async categoryUpdate(req, res, next){

        try {
            const cateId = req.params.id
            const category = await Category.findById(cateId)
            await category.updateOne({ $set: req.body})

            const updatedCategory = await Category.findById(cateId)
            res.status(200).json({
                message: 'The category has been updated.',
                category: updatedCategory
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /category/delete/:id
    async categoryDelete(req, res, next){

        try {
            const cateId = req.params.id
            const idea = await Idea.find({ category_id: cateId})

            if (idea.length > 0){
                res.status(200).json({
                    message: "Category can't be deleted because it has already been used."
                })

            } else {
                const category = await Category.findById(cateId)
                await category.deleteOne()
                res.status(200).json({
                    message: 'The category has been deleted.',
                })

            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /categories
    async getAllCategory(req, res, next){

        try {
            const category = await Category.find({})
            res.status(200).json(category)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /category/:id
    async getACategory(req, res, next){

        try {
            const category = await Category.findById(req.params.id)
            res.status(200).json(category)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new CategoryController
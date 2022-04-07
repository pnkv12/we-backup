const View = require('../models/View')
const Idea = require('../models/Idea')

class ViewController {

    // [POST] /view
    async createNewView(req, res, next) {

        try {
            const userId = req.body.user_id
            const ideaId = req.body.idea_id

            // Create a new view
            const newView = new View(req.body)
            const savedView = await newView.save()

            // Count total view 
            const viewsOfIdea = await View.find({idea_id: ideaId})
            const countViews = viewsOfIdea.length

            // Update total_view in idea collection 
            const idea = await Idea.findById(ideaId)
            await idea.updateOne({ $set: {total_view: countViews}})

            res.status(200).json({
                message: 'New view has been created',
                view: savedView,
                updated: 'Total views have been updated'
            })

        } catch (error) {
            res.status(500).json(error)
        }
    }




}

module.exports = new ViewController

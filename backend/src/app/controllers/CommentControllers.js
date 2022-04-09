const Comment = require('../models/Comment')
const Idea = require('../models/Idea')
const User = require('../models/User')
const notificationMail = require('../../util/mail')
class CommentController {

    // [POST] /comment
    async createComment(req, res, next){

        try {
            const ideaId = req.body.idea_id 
           
            const data = {
                content: req.body.content,
                anonymousMode: req.body.anonymousMode,
                idea_id: req.body.idea_id,
                user_id: req.body.user_id
            }
            const newComment = await Comment(data)
            const savedComment = await newComment.save()
           
            //? Check if have a comment in idea
            const comment = await Comment.find({replierMode: false})

            if(comment.length) {
                const idea = await Idea.findById(ideaId)
                const authorId = idea.user_id
                const infoAuthor = await User.findById(authorId)
                const emailAuthor = infoAuthor.email
                const fullNameAuthor = infoAuthor.fullname 
    
                //? Send email notification to author of idea
                await notificationMail(emailAuthor, fullNameAuthor, 'idea')
            }
            res.status(200).json(savedComment)

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [POST] /comment/:id/reply
    async createReplyComment(req, res, next) {
        try {
            const mainCommentId = req.params.id
            const userId = req.session.userId

            //? Check comment by self
            const comment = await Comment.findById(mainCommentId)
            const userCommentId =  comment.user_id
            if(userId === userCommentId) {
                return res.status(403).json('Cannot comment by self')
            }

            const data = {
                content: req.body.content,
                anonymousMode: req.body.anonymousMode,
                idea_id: req.body.ideaId,
                user_id: userId
            }
            const newReplyComment = await Comment(data)
            const savedReplyComment = await newReplyComment.save()

            //? Update info main comment
            const updateData = {
                comment_id: savedReplyComment._id,
                replierMode: true
            }
            await comment.updateOne({$set: updateData})

            res.status(200).json(savedReplyComment)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [PATCH] /comment/:id
    async updateComment(req, res, next){

        try {
            const id = req.params.id
            const comment = await Comment.findById(id)
            const userId = req.body.user_id

            if (userId === comment.user_id) {
                await comment.updateOne({
                    $set: req.body
                })
                const updateComment = await Comment.findById(id)
                return res.status(200).json({
                    message: 'The comment has been updated.',
                    comment: updateComment
                })
            } else {
                return res.status(403).json({
                    message: 'Forbidden'
                })
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [DELETE] /comment/:id
    async deleteComment(req, res, next){

        try {
            const id = req.params.id
            const comment = await Comment.findById(id)
            const userId = req.body.user_id;

            if(userId === comment.user_id) {
                await comment.deleteOne();
                return res.status(200).json({
                    message: 'The comment has been deleted.'
                })

            } else {
                return res.status(403).json({
                    message: 'Forbidden'
                })
            }

        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /comments
    async showAllComment(req, res, next){

        try {
            const commentLevel1 = await Comment.find({replierMode: false}).sort({_id:-1})
            res.status(200).json(commentLevel1)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // [GET] /comment/:id  
    async showAComment(req, res, next){

        try {
            const commentReply = await Comment.findById(req.params.id)
            res.status(200).json(commentReply)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new CommentController
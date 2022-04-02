const router = require('express').Router()
const multer = require('multer')
const upload = multer()

//? Controllers
const ideaController = require('../app/controllers/IdeaControllers')
const commentController = require('../app/controllers/CommentControllers')
const roleController = require('../app/controllers/RoleControllers')
const reactController = require('../app/controllers/ReactionControllers')
const submissionController = require('../app/controllers/SubmissionControllers')
const iconController = require('../app/controllers/IconControllers')
const departmentController = require('../app/controllers/DepartmentControllers')
const viewController = require('../app/controllers/ViewControllers')
const categoryController = require('../app/controllers/CategoryControllers')
const fileController = require('../app/controllers/FileControllers')
const userController = require('../app/controllers/UserControllers')
const downloadController = require('../app/controllers/DownloadControllers')
const folderController = require('../app/controllers/FolderControllers')


//? Session
const {requiredLogin, coordinatorRole, managerRole} = require('../middleware/session')
const {registerSchema, loginSchema} = require('../middleware/validation')
const {validateRequest} = require('../middleware/handlerError')

//* Idea
router.post('/idea', requiredLogin, ideaController.createIdea)          //? Create a idea
router.patch('/idea/:id', requiredLogin, ideaController.updateIdea)     //? Update a idea
router.delete('/idea/:id', requiredLogin, ideaController.deleteIdea)    //? Delete a idea & delete all views 
router.get('/idea/:id', requiredLogin, ideaController.getAIdea)         //? Get a idea
router.get('/ideas', requiredLogin, ideaController.getAllIdea)          //? Get all ideas by pagination


//* Comment
router.post('/comment', requiredLogin, commentController.createComment)          //? Create a comment
router.post('/comment/:id/reply', requiredLogin, commentController.createReplyComment)  //? Create a comment by replier
router.patch('/comment/:id', requiredLogin, commentController.updateComment)     //? Update a comment with own account
router.delete('/comment/:id', requiredLogin, commentController.deleteComment)    //? Delete a comment with own account
router.get('/comment/:id', requiredLogin, commentController.showAComment)        //? Get a comment 
router.get('/comments', requiredLogin, commentController.showAllComment)         //? Get all latest comments (comments level1)


//* Submission
router.post('/submission', requiredLogin, coordinatorRole, submissionController.createSubmission)        //? Create a topic
router.patch('/submission/:id', requiredLogin, coordinatorRole, submissionController.updateSubmission)   //? Update a topic
router.delete('/submission/:id', requiredLogin, coordinatorRole, submissionController.deleteSubmission)  //? Delete a topic
router.get('/submission/:id', requiredLogin, coordinatorRole, submissionController.getASubmission)       //? Get a topic
router.get('/submissions', requiredLogin, coordinatorRole, submissionController.getAllSubmission)        //? Get all topics


//* View
router.post('/view', requiredLogin, viewController.createNewView)    //? Create a new viewer & count total views & update total_view in Idea Collection


//* File
router.post('/file/:id/idea', requiredLogin, upload.single('document'), fileController.createFile)   //? Upload single file to a specific folder in Google Drive
router.delete('/file/:id', requiredLogin, fileController.deleteFile)
router.get('/file/:id/idea', requiredLogin, fileController.getAllFile)


//* User
router.post('/register', requiredLogin, registerSchema, validateRequest, userController.registerUser)
router.post('/login', loginSchema, validateRequest, userController.loginUser)
router.post('/logout', requiredLogin, userController.logout)
router.patch('/user/:id', userController.updateUser)
router.delete('/user/:id', userController.deleteUser)
router.get('/user/:id', userController.getAUser)
router.get('/users', userController.getAllUser)


//* Reaction
router.post('/reaction', requiredLogin, reactController.createReact)
router.patch('/react/:id', requiredLogin, reactController.updateReact)
router.get('/react', requiredLogin, reactController.getAllReact)


//* Category
router.post('/category', requiredLogin, managerRole, categoryController.categoryCreate)         //? Create a category
router.put('/category/:id', requiredLogin, managerRole, categoryController.categoryUpdate)      //? Update a category
router.delete('/category/:id', requiredLogin, managerRole, categoryController.categoryDelete)   //? Delete a category if category is never used
router.get('/category/:id', requiredLogin, managerRole, categoryController.getACategory)        //? Get a category
router.get('/categories', requiredLogin, managerRole, categoryController.getAllCategory)        //? Get all categories


//* Role
router.post('/role', roleController.createRole)         //? Create a role
router.put('/role/:id', requiredLogin, roleController.updateRole)      //? Update a role
router.delete('/role/:id', roleController.deleteRole)   //? Delete a role
router.get('/role/:id', requiredLogin, roleController.getARole)        //? Get a role
router.get('/roles', roleController.getAllRole)         //? Get all roles


//* Department
router.post('/department', requiredLogin, coordinatorRole, departmentController.createDepart)          //? Create a department
router.put('/department/:id', requiredLogin, coordinatorRole, departmentController.updateDepart)       //? Update a department
router.delete('/department/:id', requiredLogin, coordinatorRole, departmentController.deleteDepart)    //? Delete a department
router.get('/department/:id', requiredLogin, coordinatorRole, departmentController.getADepart)         //? Get a department
router.get('/departments', requiredLogin, coordinatorRole, departmentController.getAllDepart)           //? Get all departments


//* Folder
router.post('/folder', folderController.createFolder)           //?
router.delete('/folder/:id', folderController.deleteFolder)     //? 
router.get('/folder/:id', folderController.showAFolder)         //?
router.get('/folders', folderController.showAllFolder)          //?


//* Icon
router.post('/icon', iconController.createNewIcon)     //? Create a new icon
router.put('/icon/:id', iconController.updateIcon)     //? Update a icon
router.delete('/icon/:id', iconController.deleteIcon)  //? Delete a icon
router.get('/icon/:id', iconController.getAIcon)       //? Get a icon
router.get('/icons', iconController.getAllIcon)        //? Get all icons


//* Download CSV file
router.get('/csv/download', requiredLogin, managerRole, downloadController.csvDownload)  //? Download csv


module.exports = router
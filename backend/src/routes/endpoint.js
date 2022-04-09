const router = require("express").Router();
const multer = require("multer");
const upload = multer();

//? Controllers
const ideaController = require("../app/controllers/IdeaControllers");
const commentController = require("../app/controllers/CommentControllers");
const roleController = require("../app/controllers/RoleControllers");
const reactController = require("../app/controllers/ReactionControllers");
const submissionController = require("../app/controllers/SubmissionControllers");
const iconController = require("../app/controllers/IconControllers");
const departmentController = require("../app/controllers/DepartmentControllers");
const viewController = require("../app/controllers/ViewControllers");
const categoryController = require("../app/controllers/CategoryControllers");
const fileController = require("../app/controllers/FileControllers");
const userController = require("../app/controllers/UserControllers");
const downloadController = require("../app/controllers/ExportControllers");
const folderController = require("../app/controllers/FolderControllers");

//? Session
const {
  requiredLogin,
  coordinatorRole,
  managerRole,
} = require("../middleware/session");
const { registerSchema, loginSchema } = require("../middleware/validation");
const { validateRequest } = require("../middleware/handlerError");

//* Idea
router.post("/idea", ideaController.createIdea); //? Create a idea
router.patch("/idea/:id", ideaController.updateIdea); //? Update a idea
router.delete("/idea/:id", ideaController.deleteIdea); //? Delete a idea & delete all views
router.get("/idea/:id", ideaController.getAIdea); //? Get a idea
router.get("/ideas", ideaController.getAllIdea); //? Get all ideas by pagination

//* Comment
router.post("/comment", commentController.createComment); //? Create a comment
router.post("/comment/:id/reply", commentController.createReplyComment); //? Create a comment by replier
router.patch("/comment/:id", commentController.updateComment); //? Update a comment with own account
router.delete("/comment/:id", commentController.deleteComment); //? Delete a comment with own account
router.get("/comment/:id", commentController.showAComment); //? Get a comment
router.get("/comments", commentController.showAllComment); //? Get all latest comments (comments level1)

//* Submission
router.post("/submission", submissionController.createSubmission); //? Create a topic
router.patch("/submission/:id", submissionController.updateSubmission); //? Update a topic
router.delete("/submission/:id", submissionController.deleteSubmission); //? Delete a topic
router.get("/submission/:id", submissionController.getASubmission); //? Get a topic
router.get("/submissions", submissionController.getAllSubmission); //? Get all topics

//* View
router.post("/view", viewController.createNewView); //? Create a new viewer & count total views & update total_view in Idea Collection

//* File
router.post(
  "/file/:submissionId",
  upload.single("document"),
  fileController.createFile
); //? Upload single file to a specific folder in Google Drive
router.delete("/file/:id", fileController.deleteFile);
router.get("/file/:id/idea", fileController.getAllFile);

//* User
router.post(
  "/register",
  registerSchema,
  validateRequest,
  userController.registerUser
);
router.post("/login", loginSchema, validateRequest, userController.loginUser);
router.post("/logout", userController.logout);
router.patch("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.deleteUser);
router.get("/user/:id", userController.getAUser);
router.get("/users", userController.getAllUser);

//* Reaction
router.post("/reaction", reactController.createReact);
router.patch("/react/:id", reactController.updateReact);
router.get("/react", reactController.getAllReact);

router.post("/thumbUp/:ideaId/:userId", reactController.thumbUp);
router.post("/thumbDown/:ideaId/:userId", reactController.thumbDown);

//* Category
router.post("/category", categoryController.categoryCreate); //? Create a category
router.put("/category/:id", categoryController.categoryUpdate); //? Update a category
router.delete("/category/:id", categoryController.categoryDelete); //? Delete a category if category is never used
router.get("/category/:id", categoryController.getACategory); //? Get a category
router.get("/categories", categoryController.getAllCategory); //? Get all categories

//* Role
router.post("/role", roleController.createRole); //? Create a role
router.put("/role/:id", roleController.updateRole); //? Update a role
router.delete("/role/:id", roleController.deleteRole); //? Delete a role
router.get("/role/:id", roleController.getARole); //? Get a role
router.get("/roles", roleController.getAllRole); //? Get all roles

//* Department
router.post("/department", departmentController.createDepart); //? Create a department
router.put("/department/:id", departmentController.updateDepart); //? Update a department
router.delete("/department/:id", departmentController.deleteDepart); //? Delete a department
router.get("/department/:id", departmentController.getADepart); //? Get a department
router.get("/departments", departmentController.getAllDepart); //? Get all departments

//* Folder
router.post("/folder", folderController.createFolder); //?
router.delete("/folder/:id", folderController.deleteFolder); //?
router.get("/folder/:id", folderController.showAFolder); //?
router.get("/folders", folderController.showAllFolder); //?

//* Icon
router.post("/icon", iconController.createNewIcon); //? Create a new icon
router.put("/icon/:id", iconController.updateIcon); //? Update a icon
router.delete("/icon/:id", iconController.deleteIcon); //? Delete a icon
router.get("/icon/:id", iconController.getAIcon); //? Get a icon
router.get("/icons", iconController.getAllIcon); //? Get all icons

//* Export CSV file
router.get("/csv/download/:submissionId", downloadController.csvDownload); //? Export csv
router.get("/zip/download/:ideaId", downloadController.zipDownload); //? Export zip

module.exports = router;

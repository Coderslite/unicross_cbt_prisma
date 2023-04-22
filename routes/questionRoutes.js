const express = require('express')
const {getCourseQuestions,createQuestions,deleteAllCourseQuestions,deleteAllQuestions,deleteOneCourseQuestions,}  = require('../controllers/questionController')

const router = express.Router()

router.route("/questions/:courseId").get(getCourseQuestions).delete(deleteAllCourseQuestions)

router.route("/questions").post(createQuestions).delete(deleteAllQuestions);
router.delete("questions/:courseId:/id").delete(deleteOneCourseQuestions);

module.exports =router
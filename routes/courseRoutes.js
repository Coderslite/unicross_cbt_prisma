const express = require('express');
const {getAllCourses,getOneCourse,createCourse,deleteOneCourse,deleteAllCourses} = require('../controllers/courseController')

const router = express.Router();

router.route('/courses').get(getAllCourses).post(createCourse).delete(deleteAllCourses)
router.route('/courses/:id').get(getOneCourse).delete(deleteOneCourse)

module.exports =router;
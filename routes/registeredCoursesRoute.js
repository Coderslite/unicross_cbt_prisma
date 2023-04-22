const express = require('express')
const router = express.Router();
const {getStudentRegisteredCourses,registeredCourses} = require('../controllers/registeredCourseController');

router.route('/registeredcourses').post(registeredCourses)
router.route('/registeredcourses/:studentId').get(getStudentRegisteredCourses)

module.exports = router
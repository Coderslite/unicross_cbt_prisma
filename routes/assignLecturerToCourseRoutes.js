const express = require('express')
const router = express.Router()
const {asignLecturerToCourse,getAllLecturerCourses,getLectureByCourse} = require('../controllers/assgnLecturerToCourse')

router.route('/assignedcourse').get(getAllLecturerCourses).post(asignLecturerToCourse)

router.route('/assignedcourse/:courseId').get(getLectureByCourse)

module.exports = router
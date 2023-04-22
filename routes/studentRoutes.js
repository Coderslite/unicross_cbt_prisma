const express = require('express');
const {getAllStudents,getOneStudent,deleteOneStudent,createStudent,updateStudentCourses} = require('../controllers/studentController')

const router = express.Router();

router.route('/students').get(getAllStudents).post(createStudent).put(updateStudentCourses)
router.route('/students/:id').get(getOneStudent,).delete(deleteOneStudent)

module.exports =router;
const express = require('express');
const {getAllLecturers, getOneLecturer,createLecturer} = require('../controllers/lecturerController')

const router = express.Router();

router.route('/lecturer').get(getAllLecturers).post(createLecturer)
router.route('/lecturer/:id').get(getOneLecturer)

module.exports =router;
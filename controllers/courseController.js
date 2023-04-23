const prisma = require('../prisma/index');

exports.createCourse = async (req, res) => {
    const {courseCode,courseTitle,lecturerId,duration} = req.body;
    if (!courseCode||!courseTitle||!lecturerId) {
        res.status(500).send({
            status: false,
            message: "courseCode, courseTitle, lectureId fields required"
        })
    }
    else {
        await prisma.coursesModel.create({
            data: {
                courseCode, courseTitle, lecturerId,duration
            }
        }).then((result) => {
            res.json({
                status: true,
                data: result
            })
        }).catch(err => {
            res.status(500).send(err)
        })
    }
}

exports.getAllCourses = async (req,res)=>{
    await prisma.coursesModel.findMany().then((result) => {
        res.json({
            status: true,
            data: result
        })
    }).catch(err => {
        res.status(500).send(err)
    })
}


exports.getOneCourse = async (req, res) => {
    const id = req.params.id;
    await prisma.coursesModel.findUnique({
        where: {
            id
        }
    }).then((result) => {
        res.json({
            status: true,
            data: result
        })
    }).catch(err => {
        res.status(500).send(err)
    })
}

exports.deleteOneCourse = async (req, res) => {
    const id = req.params.id;
    await prisma.coursesModel.delete({
        where: {
            id
        }
    }).then((result) => {
        res.json({
            status: true,
            data: result
        })
    }).catch(err => {
        res.status(500).send(err)
    })
}

exports.deleteAllCourses = async (req, res) => {
    const id = req.params.id;
    await prisma.coursesModel.deleteMany().then((result) => {
        res.json({
            status: true,
            data: result
        })
    }).catch(err => {
        res.status(500).send(err)
    })
}
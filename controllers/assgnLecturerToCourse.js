const prisma = require('../prisma/index')

exports.asignLecturerToCourse = async (req, res) => {
    const { lecturerId, courseId } = req.body;
    await prisma.coursesModel.findUnique({
        where: {
            id: courseId
        }
    }).then(async (resp) => {
        await prisma.lecturerModel.findUnique({
            where: {
                id: lecturerId
            }
        }).then(async (respp) => {
            await prisma.lecuturerCourses.findUnique({
                where: {
                    courseId: courseId
                }
            }).then((respo) => {
                res.status(500).send({
                    status: false,
                    message: "Course Already being taken by another lecturer"
                })
            }).catch(async err => {
                await prisma.lecuturerCourses.create({
                    data: {
                        lecturerId, courseId
                    }
                }).then((result) => {
                    res.json({
                        status: true,
                        data: result
                    })
                }).catch(err => {
                    res.status(500).send({
                        status: false,
                        message: err,
                    })
                })
            })
        }).catch(err => {
            res.status(500).send({
                status: false,
                message: "Lecturer not found"
            })
        })
    }).catch(err => {
        res.status(500).send({
            status: false,
            message: "Course no found",
        })
    })
}

exports.getAllLecturerCourses = async (req, res) => {
    await prisma.lecuturerCourses.findMany(
        {
            include: {
                Lecturer: true,
                course: true,
            }
        }
    ).then((result) => {
        res.json({
            status: true,
            message: result
        })
    }).catch(err => {
        res.status(500).send({
            status: false,
            message: err
        })
    })
}

exports.getLectureByCourse = async (req, res) => {
    const courseId = req.params.courseId;
    console.log(courseId);
    await prisma.lecuturerCourses.findFirst({
        where: {
            courseId: courseId
        },
        include: {
            course: true,
            Lecturer: true
        }
    }).then((result) => {
        res.json({
            status: true,
            data: result
        })
    }).catch(err => {
        res.status(500).send({
            status: false,
            message: err
        })
    })
}
const prisma = require('../prisma/index');


exports.createStudent = async (req, res) => {
    const { username, password, fullName } = req.body;
    if (!username || !password || !fullName) {
        res.status(500).send({
            status: false,
            message: "username,password,fullName fields required"
        })
    }
    else {
        await prisma.studentModel.create({
            data: {
                username: username,
                password: password,
                fullName: fullName,
            },
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


// get all Students
exports.getAllStudents = async (req, res) => {
    await prisma.studentModel.findMany({
        include: {
            registeredCourses: true
        },
    }).then((result) => {
        res.json({
            status: true,
            data: result
        })
    }).catch(err => {
        res.status(500).send(err)
    })
}

exports.getOneStudent = async (req, res) => {
    const id = req.params.id;
    await prisma.studentModel.findUnique({
        include: {
            registeredCourses: true
        },
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

exports.deleteOneStudent = async (req, res) => {
    const id = req.params.id;
    const student = await prisma.studentModel.delete({
        where: {
            id
        }
    }).then((result) => {
        res.json({
            status: true,
            data: student
        })
    }).catch(err => {
        res.status(500).send(err)
    })
}


exports.updateStudentCourses = async (req, res) => {
    const { bodyCourses, id, username } = req.body;
    await prisma.studentModel.update({
        where: { id },
        data: {
            courses: bodyCourses,
            username: username,
        }
    }).then(result => {
        res.json({
            status: true,
            data: result,
        })
    }).catch((err) => {
        res.status(500).send({
            status: false,
            message: err
        })
    })
}
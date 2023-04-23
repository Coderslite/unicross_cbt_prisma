const prisma = require('../prisma/index');


// get all lecturers
exports.getAllLecturers = async (req, res) => {
    const allLecturers = await prisma.lecturerModel.findMany({
        include:{
            coursesToTake:true
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


// get one lecturer
exports.getOneLecturer = async (req, res) => {
    const id = req.params.id;
    const lecturer = await prisma.lecturerModel.findUnique({
        where: {
            id
        }
    }).then((result) => {
        res.json({
            status: true,
            data: lecturer
        })
    }).catch(err => {
        res.status(500).send(err)
    })
}

// create lecturer
exports.createLecturer = async (req, res) => {
    const { username, password, fullName } = req.body;
    if (!username || !password || !fullName) {
        res.status(500).send({
            status: false,
            message: "All fields required"
        })
    }
    else {
        await prisma.lecturerModel.create({
            data: {
                username, password, fullName,
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
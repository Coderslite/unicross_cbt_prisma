const prisma = require('../prisma/index');

exports.getCourseQuestions = async (req, res) => {
    const courseId = req.params.courseId
    console.log(courseId)
    await prisma.questionModel.findMany().then((result) => {
        res.json({
            status: true,
            data: result
        })
    }).catch(err => {
        res.status(500).send({
            status: false,
            message: err
        });
    });
}

exports.createQuestions = async (req, res) => {
    const { question, options, answer, courseId, type } = req.body;
    if (!question || !options || !answer || !courseId || !type) {
        res.status(500).send({
            status: false,
            message: "All field required"
        })
    }
    else {
        prisma.coursesModel.findUnique({
            where:{
                id:courseId
            }
        }).then(async (resp)=>{
            await prisma.questionModel.createMany({
                data: {
                  question: question,
                  answer: answer,
                  options:options,
                  type: type,
                  courseId: courseId,
                }
            }).then((result) => {
                res.json({
                    status: true,
                    data: result
                })
            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    status: false,
                    message: err,
                })
            })
        }).catch(err=>{
            res.status(500).send({
                status:false,
                message:"Course not found"
            })
        })
    }
}

exports.deleteAllQuestions=async(req,res)=>{
    await prisma.questionModel.deleteMany().then((result)=>{
        res.json({
            status:true,
            message:"All questions deleted"
        })
    }).catch(err=>{
        res.status(500).send({
            status:false,
            message:err,
        })
    })
}

exports.deleteAllCourseQuestions = async (req,res)=>{
    const courseId = req.params.courseId;
    await prisma.questionModel.deleteMany(
        {
            where:{
                courseId
            }
        }
    ).then((result)=>{
        res.json({
            status:true,
            message:result
        })
    }).catch(err=>{
        res.status(500).send({
            status:false,
            message:err,
        })
    })
}

exports.deleteOneCourseQuestions = async(req,res)=>{
    const {courseId,id} = req.params;
    await prisma.questionModel.deleteMany(
        {
            where:{
                id:id,
                courseId:courseId
            }
        }
    ).then((result)=>{
        res.json({
            status:true,
            message:"All questions deleted"
        })
    }).catch(err=>{
        res.status(500).send({
            status:false,
            message:err,
        })
    })
}
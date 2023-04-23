const prisma = require('../prisma/index');

exports.getStudentRegisteredCourses = async(req,res)=>{
    const studentId = req.params.studentId;
    await prisma.registeredCourses.findMany({
        include:{
            Student:true,
            Courses:true,
        },
         where:{
            studentId
         }
    }).then((result)=>{
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


exports.registeredCourses = async(req,res)=>{
    const {courseId,studentId} =req.body;
 if(!courseId || !studentId){
    res.json({
        status:false,
        message:"All field is required"
    })
 }
 else{
    prisma.coursesModel.findUnique({
        where:{
            courseId
        }
    }).then(async(resp)=>{
        await prisma.registeredCourses.create({
            data:{
              courseId:courseId,
              studentId:studentId
            },
          }).then((result)=>{
              res.json({
                  status:true,
                  message:result,
              })
          }).catch(err=>{
              res.status(500).send({
                  status:false,
                  message:err
              })
          })
    }).catch(err=>{
        res.status(500).send({
            status:false,
            message:"Course no found",
        })
    })
 }
}
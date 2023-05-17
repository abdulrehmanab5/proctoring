const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const keys = require('../config/key')
const sendEmail = require('../utils/nodemailer')
const Student = require('../models/student')
const Subject = require('../models/subject')
const Attendence = require('../models/attendence')
const Message = require('../models/message')
const Mark = require("../models/marks")
const Paper = require("../models/papers")

//File Handler
const bufferConversion = require('../utils/bufferConversion')
const cloudinary = require('../utils/cloudinary')

const validateStudentLoginInput = require('../validation/studentLogin')
const validateStudentUpdatePassword = require('../validation/studentUpdatePassword')
const validateForgotPassword = require('../validation/forgotPassword')
const validateOTP = require('../validation/otpValidation')
const { markAttendence } = require("./facultyController")
const papers = require("../models/papers")

module.exports = {
    studentLogin: async (req, res, next) => {
        const { errors, isValid } = validateStudentLoginInput(req.body);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }
        const { registrationNumber, password } = req.body;

        const student = await Student.findOne({ registrationNumber })
        if (!student) {
            errors.registrationNumber = 'Registration number not found';
            return res.status(404).json(errors);
        }
        const isCorrect = await bcrypt.compare(password, student.password)
        if (!isCorrect) {
            errors.password = 'Invalid Credentials';
            return res.status(404).json(errors);
        }
        const payload = { id: student.id, student };
        jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
            }
        );


    },
    checkAttendence: async (req, res, next) => {
        try {
            const studentId = req.user._id
            const attendence = await Attendence.find({ student: studentId }).populate('subject')
            if (!attendence) {
                res.status(400).json({ message: "Attendence not found" })
            }
            res.status(200).json({
                result: attendence.map(att => {
                    let res = {};
                    res.attendence = ((att.lectureAttended / att.totalLecturesByFaculty) * 100).toFixed(2)
                    res.subjectCode = att.subject.subjectCode
                    res.subjectName = att.subject.subjectName
                    res.maxHours = att.subject.totalLectures
                    res.absentHours = att.totalLecturesByFaculty - att.lectureAttended
                    res.lectureAttended = att.lectureAttended
                    res.totalLecturesByFaculty = att.totalLecturesByFaculty
                    return res
                })
            })
        }
        catch (err) {
            console.log("Error in fetching attendence",err.message)
        }
        
    },
    getAllStudents: async (req, res, next) => {
        try {
            const { department, year, section } = req.body;
            const students = await Student.find({ department, year, section })
            if (students.length === 0) {
                return res.status(400).json({ message: "No student found" })
            }
            return res.status(200).json({ result: students })

        }
        catch (err) {
            return res.status(400).json({ message: err.message })
        }
    },
    getStudentByName: async (req, res, next) => {
        try {
            const { name } = req.body
            const students = await Student.find({ name })
            if (students.length === 0) {
                return res.status(400).json({ message: "No student found" })
            }
            return res.status(200).json({ result: students })

        }
        catch (err) {
            return res.status(400).json({ message: err.message })
        }
    },
    updatePassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateStudentUpdatePassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { registrationNumber, oldPassword, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewpassword = 'Password Mismatch'
                return res.status(400).json(errors);
            }
            const student = await Student.findOne({ registrationNumber })
            const isCorrect = await bcrypt.compare(oldPassword, student.password)
            if (!isCorrect) {
                errors.oldPassword = 'Invalid old Password';
                return res.status(404).json(errors);
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            student.password = hashedPassword;
            await student.save()
            res.status(200).json({ message: "Password Updated" })
        }
        catch (err) {
            console.log("Error in updating password", err.message)
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { errors, isValid } = validateForgotPassword(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email } = req.body
            const student = await Student.findOne({ email })
            if (!student) {
                errors.email = "Email Not found, Provide registered email"
                return res.status(400).json(errors)
            }
            function generateOTP() {
                var digits = '0123456789';
                let OTP = '';
                for (let i = 0; i < 6; i++) {
                    OTP += digits[Math.floor(Math.random() * 10)];
                }
                return OTP;
            }
            const OTP = await generateOTP()
            student.otp = OTP
            await student.save()
            await sendEmail(student.email, OTP, "OTP")
            res.status(200).json({ message: "check your registered email for OTP" })
            const helper = async () => {
                student.otp = ""
                await student.save()
            }
            setTimeout(function () {
                helper()
            }, 300000);
        }
        catch (err) {
            console.log("Error in sending email", err.message)
        }
    },
    getStudentByRegName: async (req, res, next) => {
        try {
            const { registrationNumber } = req.body
            const students = await Student.findOne({ registrationNumber })
            if (!students) {
                return res.status(400).json({ message: "No student found" })
            }
            return res.status(200).json({ result: students })

        }
        catch (err) {
            return res.status(400).json({ message: err.message })
        }
    },
    postOTP: async (req, res, next) => {
        try {
            const { errors, isValid } = validateOTP(req.body);
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const { email, otp, newPassword, confirmNewPassword } = req.body
            if (newPassword !== confirmNewPassword) {
                errors.confirmNewPassword = 'Password Mismatch'
                return res.status(400).json(errors);
            }
            const student = await Student.findOne({ email });
            if (student.otp !== otp) {
                errors.otp = "Invalid OTP, check your email again"
                return res.status(400).json(errors)
            }
            let hashedPassword;
            hashedPassword = await bcrypt.hash(newPassword, 10)
            student.password = hashedPassword;
            await student.save()
            return res.status(200).json({ message: "Password Changed" })
        }
        catch (err) {
            console.log("Error in submitting otp", err.message)
            return res.status(200)
        }
    },
    
   
    
    
    updateProfile: async (req, res, next) => {
        try {
            const {email, gender, studentMobileNumber, fatherName,
                fatherMobileNumber} = req.body
            const userPostImg = await bufferConversion(req.file.originalname, req.file.buffer)
            const imgResponse = await cloudinary.uploader.upload(userPostImg)
            const student = await Student.findOne({ email })
            if (gender) {
                student.gender = gender
                await student.save()
            }
            if (studentMobileNumber) {
                student.studentMobileNumber = studentMobileNumber
                await student.save()
            }
            if (fatherName) {
                student.fatherName = fatherName
                await student.save()
            }
            if (fatherMobileNumber) {
                student.fatherMobileNumber = fatherMobileNumber
                await student.save()
            }
         
                student.avatar = imgResponse.secure_url
                await student.save()
                res.status(200).json(student)
        }
        catch (err) {
            console.log("Error in updating Profile", err.message)
        }
    },
    getAllSubjects: async (req, res, next) => {
        try {
            const { department, year } = req.user;
            const subjects = await Subject.find({ department, year })
            if (subjects.length === 0) {
                return res.status(404).json({ message: "No subjects founds" })
            }
            res.status(200).json({result: subjects })
        }
        catch (err) {
            return res.status(400).json({"Error in getting all subjects":err.message})
        }
    },
    getMarks: async (req, res, next) => {
        try {
            console.log("req.user",req.user)
            const {department, year, id} = req.user
            const getMarks = await Mark.find({ department, student: id }).populate('subject')
            console.log("getMarks",getMarks)
          
            const CycleTest1 = getMarks.filter((obj) => {
                return obj.exam === "CycleTest1"
            })
            const CycleTest2 = getMarks.filter((obj) => {
                return obj.exam === "CycleTest2"
            })
            const Semester = getMarks.filter((obj) => {
                return obj.exam === "Semester"
            })
            res.status(200).json({
                result: {
                    CycleTest1,
                    CycleTest2,
                    Semester
                    
            }})
        }
        catch (err) {
            return res.status(400).json({ "Error in getting marks": err.message })
        }
    },
    
    getPapers: async (req, res, next) => {
        try {
            console.log("req.user",req.user)
            const {department, year, id} = req.user
            const getPapers = await Paper.find({ department }).populate('subject')
            console.log("getPapers")
            console.log("getPapers",getPapers)
          
            const CycleTest1 = getPapers.filter((obj) => {
                return obj;
            })
            // const CycleTest2 = getPapers.filter((obj) => {
            //     return obj.exam === "CycleTest2"
            // })
            // const Semester = getPapers.filter((obj) => {
            //     return obj.exam === "Semester"
            // })
            res.status(200).json({
                result: {
                    CycleTest1,
                    // CycleTest2,
                    // Semester
                    
            }
        })
        }
        catch (err) {
            return res.status(400).json({ "Error in getting Papers": err.message })
        }
    },


    getModel: async (req, res, next) => {
        let feedbackData;
  const { ID, Category, Feedback } = req.body;
  try {
    if (!ID || !Category || !Feedback) {
      console.log("Missing Feedback Data");
      res.status(400).json({ error: "Please fill the fields properly" });
    } else {
     

      // Send data to the AI server
      const aiServerURL = 'http://localhost:5000/modelapi'; // Replace with your AI server URL
      const response = await axios.post(aiServerURL, {
        feedback: Feedback,
      });

      if (response.status === 200) {
        const Review = response.data;
        console.log(Review);
        console.log(Review);
        feedbackData = new FeedbackData({ ID, Category, Feedback, Review });
        feedbackData.save();
        res.status(201).json({ message: "Your Feedback Successfully Posted" });
      } else {
        console.log("Error communicating with the AI server");
        res.status(500).json({ error: "Error communicating with the AI server" });
      }
    }
  } catch (err) {
    console.log("err");
    res.status(500).json({ error: "Internal server error" });
  }

    },

    // getPapers: async (req, res, next) => {

    //     try {
    //         console.log("req.user",req.user)
    //         const {department, year, id, exam} = req.user
    //         const getPapers = await Paper.find({ department, exam, student: id }).populate('subject')
    //         console.log("getPapers",getPapers)
          
    //         const CycleTestp = getPapers.filter((obj) => {
    //             return obj.exam === "CycleTestp"
    //         })
    //         const CycleTest2 = getPapers.filter((obj) => {
    //             return obj.exam === "CycleTest2"
    //         })
    //         const Semester = getPapers.filter((obj) => {
    //             return obj.exam === "Semester" 
    //         })
    //         res.status(200).json({
    //             result: {
    //                 CycleTestp,
    //                 CycleTest2,
    //                 Semester
                    
    //         }})
    //     }
    //     catch (err) {
    //         return res.status(400).json({ "Error in getting Papers": err.message })
    //     }
    // }


    
}

const router = require('express').Router(); //เรียกใชExpress
const User = require('../model/User');//Import model user
const {registerValidation} = require('../validation');

// //VALIDATION // ย้ายไปสร้างเป็นfunction
// const Joi = require('@hapi/joi');// API library ช่วยตรวจควมถูกต้อง
// //กำหนดเงื่อนไขการตรวจสอบ
// const schema = Joi.object({
//     name : Joi.string().min(6).required(), //กำหนดให้name มากกว่า 6ตัว
//     email : Joi.string().min(6).required().email(),//กำหนดให้email มากกว่า 6ตัว และเป็นชนิด email
//     password : Joi.string().min(6).required(),//กำหนดให้password มากกว่า 6ตัว
// });


router.post('/register',async (req,res) => { //ทดลองเรียกRouteres Register จาก Postman หรือ Application
    //res.send('Register');//ทดลองส่งข้อความ

    //LETS VALIDATE THE DATA BEFORE WE A USER
    //res.send(error.details[0].message);//แสดงผลErrorตามเงื่อนไขในSchema
    //const {error} = schema.validate(req.body);//ตรวจสอบ req.body จากpostman ตามเงื่อนไขใน //หมายเหตุ ปิดก่อนเพราะส้ราเป็นfunctionแล้ว
    const {error} =registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //CHECKING IF THE USER IS ALREADY IN THE DATABASE
    const emailExist = await User.findOne({email: req.body.email}); //ตรวจสอบEmailซ้ำ
    if(emailExist) return res.status(400).send('Email Already Exists');//ถ้าซ้ำให้ส่งข้อความ Email Already Exists

    //CREATE A NEW USER
    const user = new User({ //สร้างตัวแปรรับค่า req.body จาก Postman
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try{ // ตรวจสอบError
        const savedUser = await user.save(); //บันทึก เก็บค่า req.body จาก Postman หรือ App ใส่ฐานข้อมูล MongoDB
        res.send(savedUser);  //ส่งการบันทึก
    }catch(err){
        res.status(400).send(err);  //ถ้าฎrrorให้ส่งค่าErrorมา
    }

});

module.exports =router; //ต้องexport ทุกครั้งเพื่อเรียกใช้จากคลาสอื่นๆ


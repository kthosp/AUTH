//VALIDATION
const Joi = require('@hapi/joi');// API library ช่วยตรวจควมถูกต้อง
//กำหนดเงื่อนไขการตรวจสอบ
//REGISTER VALIDATION
const registerValidation = data => { //สร้างเป็นfuntion
    const schema = Joi.object({
        name : Joi.string().min(6).required(), //กำหนดให้name มากกว่า 6ตัว
        email : Joi.string().min(6).required().email(),//กำหนดให้email มากกว่า 6ตัว และเป็นชนิด email
        password : Joi.string().min(6).required(),//กำหนดให้password มากกว่า 6ตัว
    });

    return schema.validate(data);
};

const loginValidation = data => { //สร้างเป็นfuntion
    const schema = Joi.object({
        email : Joi.string().min(6).required().email(),//กำหนดให้email มากกว่า 6ตัว และเป็นชนิด email
        password : Joi.string().min(6).required(),//กำหนดให้password มากกว่า 6ตัว
    });

    return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

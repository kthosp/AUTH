const express = require('express');//เรียกใช express
const app = express();// กำหนด funtion expressใส่ตัวแปรapp
const dotenv = require('dotenv');// เรียกใช้ lirary dot env  - npm install dotenv ก่อนนะ
const mongoose = require('mongoose');//เรียกใช้ mongoose เพื่อเชื่อมต่อฐานข้อมูล MongoDB ต้องไปสร้าง Cloud MongoDB Atlas Cluster ด้วย
//Import Routes 
const authRoute = require('./routes/auth'); //เรียกใช้ auth 

dotenv.config();//เรียกใช้ env config ซึงกำหนดค่าไว้ในไฟล์ .env

//Connect to DB
mongoose.connect(process.env.DB_CONNECT//ใช้คำสั่ง process.env.DB_CONNECT เรียกการเชื่อมต่อ Cloud MongoDB Atlas Cluster ที่กำหนดไว้ใน .env.DB_CONNECT
    ,{ useNewUrlParser: true  ,useUnifiedTopology: true }, //parameter ของ MongoDB atlas    
    ()=>console.log('Connected to DB!!!')//แสดงผลบน console = Connected to DB!!!
);


//Middleware
app.use(express.json());
//Route Middlewares
app.use('/api/user',authRoute);//

app.listen(3000,()=>console.log('Server Up and Running'))//กำหนดพอร์ตที่ให้RUN และ แสดงผลบน console = Server Up and Running


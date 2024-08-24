const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
    username:{type:String,unique:true },
    password:String,
    purchasedCourses:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    role:{type:String,default:"user"},
})

const courseSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
});

const User=mongoose.model('User',userSchema);
const Course=mongoose.model('Course',courseSchema);

module.exports = {
    User,
    Course
}
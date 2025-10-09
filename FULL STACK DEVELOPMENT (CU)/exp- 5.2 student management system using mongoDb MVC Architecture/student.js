// models/Student.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student name is required"],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, "Student age is required"],
    min: [1, "Age must be positive"],
  },
  course: {
    type: String,
    required: [true, "Course is required"],
  },
});

module.exports = mongoose.model("Student", studentSchema);

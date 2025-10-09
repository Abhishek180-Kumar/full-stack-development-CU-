// controllers/studentController.js
const Student = require("../models/Student");

// ➕ Create new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json({ message: "Student added successfully", data: savedStudent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 📖 Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Update student by ID
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student updated successfully", data: updatedStudent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ❌ Delete student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const express = require("express");
const router = express.Router();
const students = require("../data/students");

// GET all students
router.get("/", (req, res) => {
    res.status(200).json(students);
});

// GET student by id
router.get("/:id", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
});

// POST create student
router.post("/", (req, res) => {
    const { name, course } = req.body;
    if (!name || !course) {
        return res.status(400).json({ message: "Name and course are required" });
    }
    const newStudent = {
        id: students.length ? students[students.length - 1].id + 1 : 1,
        name,
        course
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// PUT update student
router.put("/:id", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    const { name, course } = req.body;
    if (!name || !course) {
        return res.status(400).json({ message: "Name and course are required" });
    }
    student.name = name;
    student.course = course;
    res.status(200).json(student);
});

// DELETE student
router.delete("/:id", (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }
    students.splice(index, 1);
    res.status(200).json({ message: "Student deleted" });
});

module.exports = router;
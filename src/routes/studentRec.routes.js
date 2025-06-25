const express = require('express');
const { createStudentRec, allStudents, updateStudentrec, deleteStudentrec, countStudents, studentSearch } = require('../controller/studentRec.controller');
const router   = express.Router();


router.post('/add-student', createStudentRec);
router.get('/all-students', allStudents);
router.put('/update-student/:id', updateStudentrec);
router.delete('/delete-student/:id', deleteStudentrec);
router.get('/count-students', countStudents);
router.get('/search-student', studentSearch);

module.exports = router;

import express from 'express';
const router = express.Router();
import attendanceDetails from '../controller/attendanceDetails'
import { check, validationResult } from 'express-validator'
import checkAuth from '../middleware/checkAuth'
const details = new attendanceDetails()



router.get('/', details.attendanceList);
router.delete('/:id', details.deleteAttendance);


router.put('/:id',  details.updateAttendance);
router.post('/',
     details.createNewAttendance);
router.get('/student',
     details.attendanceUserList);
router.post('/course',
     details.attendanceCourseList);

export default router;

import  AttendanceModel from "../models/attendance";
import {Request, Response} from "express";

class AttendanceDetails {
    attendanceList (req: Request, res: Response) {
        const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
        let page = 0;
        let filters = ""
        if (req.query) {
            if(req.query.name){
                filters = req.query.name
            }
            if (req.query.page) {
                req.query.page = parseInt(req.query.page);
                page = Number.isInteger(req.query.page) ? req.query.page : 0;
            }
        }
        AttendanceModel.getAllAttendance(limit, page, filters)
            .then((result: any) => {
                res.status(200).json({
                    count: result.length,
                    next: result.length === limit ? '' : '',
                    prev: '',
                    result: result
                });
            })
    }
    attendanceUserList (req: Request, res: Response) {
        AttendanceModel.getAttendanceByUser(req.query.student, req.query.course)
            .then((result: any) => {
                res.status(200).json(result);
            })
    }
    attendanceCourseList (req: Request, res: Response) {
        AttendanceModel.getAttendanceByUser(req.body.courseId)
            .then((result: any) => {
                res.status(200).json({
                    result: result
                });
            })
    }
    async createNewAttendance (req: Request, res: Response) {
        const attendanceData = {
            studentId: req.body.student,
            courseId: req.body.course,
            batchId: req.body.batch,
            status: req.body.status
        }
        AttendanceModel.createAttendance(attendanceData)
            .then((result: any) => {
                res.status(201).json(result);
            });
    }
    updateAttendance (req: Request, res: Response) {
        const attendanceData = {
            status: req.body.status
        }
        AttendanceModel.updateAttendanceDetail(req.params.id, attendanceData)
            .then((result: any) => {
                res.status(201).send({id: result});
            });
    }


    deleteAttendance (req: Request, res: Response) {
        AttendanceModel.deleteAttendance(req.params.id)
            .then((result: any)=> {
                res.status(200).send(result)
            })
    }


}

export default AttendanceDetails;
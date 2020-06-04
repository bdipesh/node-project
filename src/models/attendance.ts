

import mongoose from '../bin/connections'

const schemaAttendance = {
    studentId:
        {
            type: mongoose.SchemaTypes.String,
            ref: 'user'
        },
    batchId: {
        type: mongoose.SchemaTypes.String,
        ref: 'batch'
    },
    courseId: {
        type: mongoose.SchemaTypes.String,
        ref: 'course'
    },
    status: {
        type: mongoose.SchemaTypes.String,
        enum: ['Present', 'Absent']
    },
    date: {
        type: Date,
        default: Date.now()
    }


};
const collectionName = "attendance";
const attendanceSchema = new mongoose.Schema(schemaAttendance);
const Attendance = mongoose.model(collectionName, attendanceSchema);

const getAllAttendance = (perPage: number, page: number, filters: any) => {
    return new Promise((resolve, reject) => {
        Attendance.find()
            .limit(perPage)
            .skip(page)
            .exec(function (err: any, attendances) {
                if (err) {
                    reject(err);
                } else {
                    resolve(attendances);
                }
            })
    })

}

const getAttendanceByUser = (userId: string, courseId: string) => {
    console.log(courseId)
    return new Promise((resolve, reject) => {
        Attendance.find()
            .where({'courseId': courseId, 'studentId': `${userId}`})
            // .populate('studentId')
            .limit(100)
            .then((response) => {
                resolve(response)
            }).catch((error) => {
            reject(error)
        })
    })
}
const getAttendanceByCourse = (courseId: string) => {
    return new Promise((resolve, reject) => {
        Attendance.findOne({courseId: courseId})
            .populate('batchId', 'courseId', 'studentId')
            .then((response) => {
                resolve(response)
            }).catch((error) => {
            reject(error)
        })
    })
}


const createAttendance = (attendanceData: object) => {
    return new Promise((resolve, reject)=> {
        Attendance.create(attendanceData, (error: any, response: object) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        })

    })
}
const updateAttendanceDetail = (attendanceId: string, attendanceData: object) => {
    return new Promise((resolve, reject)=> {
        Attendance.findByIdAndUpdate(attendanceId, attendanceData,(error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        });
    })
}

const deleteAttendance = (attendanceId: string) => {
    return new Promise((resolve, reject)=> {
        Attendance.findByIdAndRemove(attendanceId, (error, response) => {
            if(error) {
                reject(error);
            } else {
                resolve(response)
            }
        })
    })
}

export default {
    deleteAttendance,
    updateAttendanceDetail,
    createAttendance,
    getAttendanceByCourse,
    getAttendanceByUser,
    getAllAttendance
}
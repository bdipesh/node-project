

import mongoose from '../bin/connections'

const schemaNotice = {
    notice: {
        type: String,
        default: ''  
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    file: [{type: String}]
};
const collectionName = "notice";
const noticeSchema = new mongoose.Schema(schemaNotice);
const Notice = mongoose.model(collectionName, noticeSchema);


const getAllNotice = (perPage: number, page: number, filters: string) => {
    return new Promise((resolve, reject) => {
        Notice.find()
            .populate('createdBy')
            .skip(page)
            .exec(function (err, notice) {
                if (err) {
                    reject(err);
                } else {
                    resolve(notice);
                }
            })
    })

}


const createNotice = (noticeData: object) => {
    return new Promise((resolve, reject)=> {
        Notice.create(noticeData, (error: any, response: object) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        })

    })

}

const updateNoticeDetail = (noticeId: string, noticeData: object) => {
    return new Promise((resolve, reject)=> {
        Notice.findByIdAndUpdate(noticeId, noticeData,(error, response) => {
            if(error){
                reject(error);
            }
            else {
                resolve(response)
            }
        });
    })
}

const deleteNotice = (noticeId: string) => {
    return new Promise((resolve, reject)=> {
        Notice.findByIdAndRemove(noticeId, (error, response) => {
            if(error) {
                reject(error);
            } else {
                resolve(response)
            }
        })
    })
}
export default {
    deleteNotice,
    updateNoticeDetail,
    getAllNotice,
    createNotice
}


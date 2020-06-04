import  NoticeModel from "../models/notice";
import {Request, Response} from "express";
import common from "../middleware/common";

class NoticeDetails {
    noticeList (req: Request, res: Response) {
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

        NoticeModel.getAllNotice(limit, page, filters)
            .then((result: any) => {
                res.status(200).json(
                    result
                );
            })
    }
    async createNewNotice (req: Request, res: Response) {
        const noticeData = {
            notice: req.body.notice,
            createdBy: req.body.createdBy,
            files: req.files || []
        }
        NoticeModel.createNotice(noticeData)
            .then((result: any) => {
                res.status(201).send({id: result});
            });
    }
    updateNotice (req: Request, res: Response) {
        const noticeData = {
            noticeCode: req.body.noticeCode,
            noticeName: req.body.noticeName
        }
        NoticeModel.updateNoticeDetail(req.params.id, noticeData)
            .then((result: any) => {
                res.status(201).send({id: result});
            });
    }


    deleteNotice (req: Request, res: Response) {
        NoticeModel.deleteNotice(req.params.id)
            .then((result: any)=> {
                res.status(200).send(result)
            })
    }


}

export default NoticeDetails;
import express from 'express';
const router = express.Router();
import noticeDetails from '../controller/noticeDetails'
import { check, validationResult } from 'express-validator'
import checkAuth from '../middleware/checkAuth'
const details = new noticeDetails()


router.get('/', [details.noticeList]);
router.delete('/:id', [details.deleteNotice]);

const validateNotice = () => {
                 return [
        check('notice', "Notice field must be required").not().isEmpty(),
    ]
}

router.put('/:id', validateNotice(),  (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    } else {
        details.updateNotice(req, res)
    }
});
router.post('/',
    checkAuth,
    validateNotice(), (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            details.createNewNotice(req, res);
        }

    });

export default router;

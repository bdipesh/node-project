import express, {Request, Response} from 'express';
const router = express.Router();
import userDetails from '../controller/userDetails'
import { check, validationResult }  from 'express-validator';
import checkAuth from '../middleware/checkAuth'
import fileUpload from '../middleware/imageUpload'
import authentication from '../controller/authentication'
const handleLogin = new authentication();
const details = new userDetails();



router.get('/', [details.userList]);
router.get('/:id', [details.findOneUser]);
router.get('/detail/me',  handleLogin.getLoginUser);
router.delete('/:id', [details.deleteUser]);


const validateUser = () => {
    return [
        check('name').notEmpty().withMessage("Name field is required.")
            .not().isNumeric().withMessage("Name field should not contain Number."),
        // check('email').not().isEmpty().withMessage("Should not be empty")
        //     .isEmail().withMessage("Enter valid email"),
        check('password').not().isEmpty().withMessage("Password field is required.")
            .isLength({min:8}).withMessage("Password field must contain 8 charters.")
    ]
}

router.patch('/:id', fileUpload.any(),  (req: Request, res: Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    } else {
        details.updateUsers(req, res)
    }
});
router.post('/', fileUpload.any(),
     (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        } else {
            details.createUsers(req, res);
        }

    });

router.post('/get-token', handleLogin.loginWithDetails);


export default router;

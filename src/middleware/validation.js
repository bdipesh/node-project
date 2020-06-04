import BatchModel from "../models/batch";

const validateBatch = () => {
    return [
        check('name').notEmpty().withMessage("Name field is required.")
            .not().isNumeric().withMessage("Name field should not contain Number."),
        check('email').not().isEmpty().withMessage("Should not be empty")
            .isEmail().withMessage("Enter valid email")
            .custom(email => {
                console.log(email)
                BatchModel.getBatchByEmail(email).then((response)=> {
                    if(!response) {
                        console.log('error')
                        throw new Error("Email already used.")
                    }
                }).catch(()=> {
                    console.log('hello')
                })
            })
        ,
        check('password').not().isEmpty().withMessage("Password field is required.")
            .isLength({min:8}).withMessage("Password field must contain 8 charters."),
        check('batch', "Name field must be required").not().isEmpty(),
        check('course', "Name field must be required").not().isEmpty(),
    ]
}
export default validateBatch();
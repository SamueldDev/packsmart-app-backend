



// import { validationResult } from "express-validator";

// export const validate = (req, res, next) => {
//   const errors = validationResult(req);
//   if (errors.isEmpty()) return next();

//   const extractedErrors = errors.array().map(err => ({
//     field: err.param,
//     message: err.msg,
//   }));

//   return res.status(400).json({
//     message: "Validation failed",
//     errors: extractedErrors,
//   });
// };




import{ body, query, param, validationResult } from "express-validator"

export const registerValidator = [
  body("name").escape().notEmpty().withMessage("name is required"),
  body("email").escape().isEmail().withMessage("Valid email is required"),
  body("phoneNumber")
    .matches(/^\+\d{10,15}$/)
    .withMessage("Phone number must be in international format, e.g., +2348123456789"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const loginValidator = [
  body("email").escape().isEmail().withMessage("Valid email is required"),
  body("password").escape().notEmpty().withMessage("Password is required"),
];


export const validationResultMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // let format = errors.array().map(error => {
        //     return {
        //         value: error.value,
        //         message: error.msg
        //     }
        // })

        return res.status(422).json({
            status: false,
            message: "Validation failed",
            errors: errors.array(),
        });
    }
    next();
}
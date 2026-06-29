import { body } from "express-validator";

const userRegisterValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty()
            .withMessage("Email is required")
            .isEmail()
            .withMessage("Email is invalid"),

        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLength({
                min: 4,
            })
            .withMessage("Length of username must be more than 3"),

        body("password").trim().notEmpty().withMessage("Password is required"),
    ];
};

export { userRegisterValidator };

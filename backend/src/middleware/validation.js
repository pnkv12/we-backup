const { body } = require('express-validator')
const bcrypt = require('bcrypt')
const User = require('../app/models/User')

const registerSchema = [
    body('username')
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .bail()
        .isLength({max: 10})
        .withMessage('Username in 10 characters')
        .bail()
        .custom(async(value) => {
            const user = await User.find({username: value})
            if(user.length > 0) {
                throw new Error('Username is exist')
            }
            return true
        }),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .bail()
        .isLength({min: 6})
        .withMessage('Password at least 6 characters'),
    body('confirmPassword')
        .not()
        .isEmpty()
        .withMessage('Confirm password is required')
        .bail()
        .custom((value, {req}) => {
            const password = req.body.password
            if(value === password) {
                return true
            }
        })
        .withMessage('Confirm password is incorrect'),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email is required')
        .bail()
        .isLength({max: 50})
        .withMessage('Email in 50 characters')
        .bail()
        .custom((value) => {
            const regex = /^.+@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
            if (regex.test(value)) {
                const localPart = String(value).split('@');
                if (localPart[0].length <= 64) {
                    return true;
                }
            }  
            throw new Error('Invalid Email');
        })
        .custom(async(value) => {
            const user = await User.find({email: value})
            if(user.length > 0) {
                throw new Error('Email is exist')
            }
            return true
        })
        .normalizeEmail(),
    body('fullname')
        .not()
        .isEmpty()
        .withMessage('Full name is required')
        .bail()
        .isLength({max: 100})
        .withMessage('Full name in 100 characters'),
    body('roleId')
        .not()
        .isEmpty()
        .withMessage('Role is required')
        .bail()
        .isLength({max: 30})
        .withMessage('Role in 30 character'),
    body('departId')
        .not()
        .isEmpty()
        .withMessage('Department is required')
        .bail()
        .isLength({max: 30})
        .withMessage('Department in 30 characters')
]

const loginSchema = [
    body('username')
        .not()
        .isEmpty()
        .withMessage('Username is required')
        .bail()
        .isLength({max: 10})
        .withMessage('Username in 10 characters'),
    body('password')
        .not()
        .isEmpty()
        .withMessage('Password is required')
        .bail()
        .isLength({min:6})
        .withMessage('Password at least 6 characters')
]

module.exports = {registerSchema, loginSchema}
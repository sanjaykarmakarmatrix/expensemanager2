const models = require('../models');
const userModel = models.User;
const SHA512 = require('crypto-js/sha512');
const { Validator } =  require('node-input-validator');
const tokenHelper = require('../helpers/token');

const UserController = {

    userLogin: async (req, res) => {
        let formData = req.body;
        console.log(formData);
        
        //validation
        var validation  = new Validator(formData,{
            email: 'required|email',
            password: 'required',
        });
        const matched = await validation.check();
        if (!matched) {
            res.send({
                status: 'error',
                code: 'UC-UR-0001',
                details: validation.errors
            })
        } else {
            userModel.authenticate(formData).then((responseData) => {
                let user = responseData.toJSON();
                user['access_token'] = tokenHelper.createToken(user);

                res.send({
                    status: 'success',
                    code: 'UC-UR-0002',
                    details: {
                        msg: 'Login successful',
                        userData: user
                    }
                });
            }).catch((err) => {
                console.log(err);
                res.send({
                    status: 'error',
                    code: 'UC-UR-0003',
                    details: {
                        msg: 'Something went wrong'
                    }
                });
            });
        }
    },

    /*
    User registration
    */
    userRegistration: async (req, res) => {
        let formData = req.body;
        
        //validation
        var validation  = new Validator(formData,{
            name: 'required',
            email: 'required|email',
            password: 'required',
        });
        const matched = await validation.check();
        if (!matched) {
            res.send({
                status: 'error',
                code: 'UC-UR-0001',
                details: validation.errors
            })
        } else {
            userModel.checkEmailExist(formData.email).then((existCount) => {
                if (existCount && existCount > 0) {
                    res.send({
                        status: 'error',
                        code: 'UC-UR-0004',
                        details: 'This email already registered with us'
                    });
                } else {
                    userModel.storeUserData(formData).then((responseData) => {
                        res.send({
                            status: 'success',
                            code: 'UC-UR-0002',
                            details: responseData
                        });
                    }).catch((err) => {
                        res.send({
                            status: 'error',
                            code: 'UC-UR-0003',
                            details: null
                        });
                    });
                }
            }).catch((err) => {
                res.send({
                    status: 'error',
                    code: 'UC-UR-0003',
                    details: 'Something went wrong'
                });
            });
        }
    },

}

module.exports = UserController;
const models = require('../models');
const groupModel = models.Group;
const SHA512 = require('crypto-js/sha512');
const { Validator } =  require('node-input-validator');

const GroupController = {

    /*
    Group registration
    */
    createGroup: async (req, res) => {
        let formData = req.body;
        
        //validation
        var validation  = new Validator(formData,{
            name: 'required'
        });
        const matched = await validation.check();
        if (!matched) {
            res.send({
                status: 'error',
                code: 'GC-CG-0001',
                details: validation.errors
            })
        } else {
            // groupModel.checkEmailExist(formData.email).then((existCount) => {
            //     if (existCount && existCount > 0) {
            //         res.send({
            //             status: 'error',
            //             code: 'GC-CG-0004',
            //             details: 'This email already registered with us'
            //         });
            //     } else {
                    groupModel.createGroup(formData).then((responseData) => {
                        res.send({
                            status: 'success',
                            code: 'GC-CG-0002',
                            details: responseData
                        });
                    }).catch((err) => {
                        res.send({
                            status: 'error',
                            code: 'GC-CG-0003',
                            details: null
                        });
                    });
            //     }
            // }).catch((err) => {
            //     res.send({
            //         status: 'error',
            //         code: 'GC-CG-0003',
            //         details: 'Something went wrong'
            //     });
            // });
        }
    },

}

module.exports = GroupController;
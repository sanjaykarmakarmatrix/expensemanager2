const models = require('../models');
const groupModel = models.Group;
const SHA512 = require('crypto-js/sha512');
const { Validator } =  require('node-input-validator');
var isBase64 = require('is-base64');
var base64Img = require('base64-img');
const fs = require('fs');
const fileType = require('file-type');

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
            groupModel.checkNameExist(formData.name).then((existCount) => {
                if (existCount && existCount > 0) {
                    res.send({
                        status: 'error',
                        code: 'GC-CNE-0004',
                        details: 'This group already registered with us'
                    });
                } else {
                    //Upload image to folder
                    const imgData = formData.image;
                    if (isBase64(imgData)) {
                        const mimeInfo = fileType(Buffer.from(imgData, 'base64'));   //Get extension from base64
                        // to declare some path to store your converted image
                        const imageName = 'group_' + Date.now() + '.' + mimeInfo.ext;
                        const path = './uploads/groups/'+imageName;
                        
                        // to convert base64 format into random filename
                        const base64Data = imgData.replace(/^data:([A-Za-z-+/]+);base64,/, '');                    
                        fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
                        formData.image = imageName;
                    }
                    
                    groupModel.createGroup(formData).then((responseData) => {
                        res.send({
                            status: 'success',
                            code: 'GC-CG-0002',
                            details: responseData
                        });
                    }).catch((err) => {
                        console.log(err);
                        res.send({
                            status: 'error',
                            code: 'GC-CG-0003',
                            details: null
                        });
                    });
                }
            }).catch((err) => {
                res.send({
                    status: 'error',
                    code: 'GC-CG-0003',
                    details: 'Something went wrong'
                });
            });
        }
    },

    /*
    List of groups
    */
    groupList: (req, res) => {
        let currentPageValue = req.query.page;
        
        // pagination section
        let page = 0;
        let perPage = 3;
        if (currentPageValue) {
            page = currentPageValue - 1;
        }        
        const offset = page * perPage;
        const limit = perPage;
        
        groupModel.groupList(offset, limit).then((data) => {
            res.send({
                status: 'success',
                code: 'GC-GL-001',
                details: {
                    imageFolder: 'backend/uploads/groups/',
                    totalRows: data.count,
                    data: data.rows
                }
            });
        }).catch((err) => {
            console.log(err);
            res.send({
                status: 'error',
                code: 'GC-GL-002',
                details: 'Something went wrong'
            });
        });
    },
    
    /*
    Groups details
    */
    groupDetails: (req, res) => {
        let id = req.params.id;
        
        groupModel.groupDetails(id).then((data) => {
            res.send({
                status: 'success',
                code: 'GC-GD-001',
                details: {
                    imageFolder: 'backend/uploads/groups/',
                    data: data
                }
            });
        }).catch((err) => {
            res.send({
                status: 'error',
                code: 'GC-GD-002',
                details: 'Something went wrong'
            });
        });
    },

    /*
    Groups details
    */
    groupEdit: (req, res) => {
        let id = req.params.id;

        groupModel.groupEdit(id).then((data) => {
            res.send({
                status: 'success',
                code: 'GC-GE-001',
                details: {
                    imageFolder: 'backend/uploads/groups/',
                    data: data
                }
            });
        }).catch((err) => {
            console.log(err);
            res.send({
                status: 'error',
                code: 'GC-GE-002',
                details: 'Something went wrong'
            });
        });
    },

}

module.exports = GroupController;
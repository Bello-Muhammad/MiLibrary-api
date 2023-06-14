const Admin = require('./adminModels')
const bcrypt = require('bcrypt');

class AdminService {

    static async adminSignUp(body) {

        const existUser = await Admin.findOne({username: body.username});

        if (existUser) {
            throw new Error('This user exist!!!')
        }

        const newAdmin = new Admin({
            ...body
        });

        return await newAdmin.save();
    }

    static async adminLogin(body) {
        
        const admin = await Admin.findByCridentials(body.username, body.password);
        
        return admin;
    }
}

module.exports = AdminService;
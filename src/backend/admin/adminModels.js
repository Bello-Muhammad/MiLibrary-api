const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password can not contain "password"')
            }
        }
    }

})


adminSchema.statics.findByCridentials = async (username, password) => {
    const admin = await Admin.findOne({username})

    if(!admin) {
        throw new Error('invalid username!')
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if(!isMatch) {
        throw new Error("invalid password")
    }

    return admin;
}

adminSchema.pre('save', async function(next) {
    const admin = this;

    if(admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }

    next()
})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin
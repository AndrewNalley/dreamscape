const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');
const Campaign = require('./Campaign');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // set up validation
    },
    campaigns: [{
        type: Types.ObjectId,
        ref: Campaign
    }]
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 8;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compareSync(password, this.password)
}

const User = model('User', userSchema);

module.exports = User;
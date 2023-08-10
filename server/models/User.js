const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcrypt');
const Story = require('./Story');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // set up validation
    },
    stories: [{
        type: Types.ObjectId,
        ref: Story,
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
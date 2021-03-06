import mongoose, { Schema } from 'mongoose'
import { isEmail } from 'validator'
import bcrypt from 'bcrypt'

var userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is a required field']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required field']
    },
    email: {
        type: String,
        required: [true, 'Email is a required field'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a correct email']
    },
    password: {
        type: String,
        required: [true, 'Password is a required field'],
        minlength: [6, 'Minimum length must be 6']
    }
}, {
    collection: "userdata"
});

// fire a function before saving the data to the database
userSchema.pre('save', async function () {
    var salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
})

const UserData = mongoose.model('userdata', userSchema);

export default UserData
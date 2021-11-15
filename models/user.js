const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

require('dotenv').config();
const jwtSecret = process.env.JWT_SECRET
const expiry = process.env.expireIn

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            index: true,
            required: true,
            minlength: 5,
            maxlength: 50,
            lowercase: true,
        },
        name: {
            type: String,
            maxlength: 100,
            required: true
        },
        username: {
            type: String,
            maxlength: 30,
        },
        phoneNumber: {
            type: String,
            maxlength: 225,
            index: true,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
            required: false,
            index: true,
        },
        status: {
            type: String,
            enum: ["active", "suspended", "inactive"],
            default: "active",
            required: true
        },
        countryCode:{
            type: String
        },
        password: {
            type: String,
            required: true,
            maxlength: 600,
        },
        role:{
            type: String,
            enum: ["administator", "user"],
            default: "user",
            required: true
        },
        currentWeight:{
            type: Number,
            default: 0.0,
            min: 0,
        },
        weightUnit:{
            type: String,
            enum:["kg","g","lbs"],
            default:'kg',
        },
        heightUnit:{
            type: String,
            enum:["cm","m","ft"],
            default:'ft',
        },
        currentHeight:{
            type: Number,
            default: 0.0,
            min: 0,
        },
        targetWeight:{
            type: Number,
            default: 0.0,
            min: 0
        },
        targetHeight: {
            type: Number,
            default: 0.0,
            min: 0,
        },
        currentBMI:{
            type: String,
            enum:["Underweight", "Normal", "Overweight", "Obese"],
            default: "Underweight"
        },
        targetBMI:{
            type: String,
            enum:["Underweight", "Normal", "Overweight", "Obese"],
            default: "Underweight"
        }

        // rememberToken: {
        //     token: {
        //         type: String,
        //         default: null,
        //     },
        //     expiredDate: {
        //         type: Date,
        //         default: null,
        //     },
        // },
        // passwordRetrive: {
        //     createdAt: {
        //         type: Date,
        //         default: Date.now(),
        //         expires: 3600,
        //     },
        //     resetPasswordToken: {
        //         type: String,
        //     },
        //     resetPasswordExpires: {
        //         type: Date,
        //     }
        // }
    },
    {
        timestamps: true,
    }
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id,
        email: this.email,
        role: this.role
    },
        jwtSecret,
        { expiresIn: expiry })

    return token;
}

const User = mongoose.model("User", userSchema);

module.exports = User;

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
       username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
       } 
    }
)
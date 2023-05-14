const mongoose = require("mongoose");
const Joi = require("joi");
// const picDef = require("../images/userDefault.jpg")

let schema = new mongoose.Schema({
    user_id: String,
    content: String,
    // profile_pic: {
    //     // check if it works
    //     type: String, default: picDef
    // },
    date_created: {
        type: Date, default: Date.now
    },
    stars: Number,
    likes: {
        type: Number, default: 0
    }
})
exports.CommentModel = mongoose.model("comments", schema)

exports.validateComment = (_reqBody) => {
    let joiSchema = Joi.object({
        content: Joi.string().min(2).max(1200).allow(null, ""),
        stars: Joi.number().min(1).max(5).required(),
    })
    return joiSchema.validate(_reqBody)
}
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const assestSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['img', 'document'],
        default: "img"
    },
    URL: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
})


const shopSchema = new mongoose.Schema(
    {
        user:{
            type: objectId,
            required: true,
            ref: 'User'
        },
        name:{
            type: String,
            required: true,
            index: true
        },
        description:{
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },
        postCode:{
            type: String,
            required: true,
        },
        certificates: [assestSchema],
        approvalStatus:{
            type: Boolean,
            required: true,
            default: false
        }
    }
)

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
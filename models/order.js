const { boolean, number } = require("joi");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: objectId,
            required: true,
            ref: 'User'
        },
        shop: {
            type: objectId,
            required: true,
            ref: 'Shop'
        },
        menu: {
            type: objectId,
            required: true,
            ref: 'Menu'
        },
        quantity: {
            type: Number,
            required: true,
            min: 0
        },
        total:{
            type: Number,
            required: true,
            min: 0
        },
        status:{
            type: Boolean,
            required: true,
            default: false
        }
    }
)

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
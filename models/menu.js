const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const menuSchema = new mongoose.Schema(
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
        name: {
            type: String,
            required: true,
            index: true
        },
        description: {
            type: String,
            required: true,
            maxlength: 50
        },
        ingredient: [{
            type: objectId,
            required: true,
            ref: 'Ingredient'
        }],
        category: {
            type: objectId,
            required: true,
            ref: 'Category'
        },
    }
)

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
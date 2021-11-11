const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const ingredientSchema = new mongoose.Schema(
    {
        user:{
            type: objectId,
            required: true,
            ref: 'User'
        },
        category:{
            type: objectId,
            required: true,
        },
        ingredient:{
            type: String,
            required: true,
            index: true
        },
        calorie:{
            type: Number,
            required: true,
            min: 0,
            default: 0.0
        }
    }
)

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient;
const Joi = require("joi");


function validateMenu(body){
    const menuSchema = Joi.object({
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        shop: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        ingredient: Joi.array().required().items(
            Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        ),
        category: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
    });

    return menuSchema.validate(body)
}

module.exports = {
    validateMenu
}
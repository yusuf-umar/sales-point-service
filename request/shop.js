const Joi = require("joi");


function validateShop(body){
    const shopSchema = Joi.object({
        user: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        shop: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
        name: Joi.string().required(),
        description: Joi.string().required(),
        address: Joi.string().required(),
        postCode: Joi.string().required(),
        certificates: Joi.array().items(
            Joi.string()
                .base64({paddingRequired: false})
                .optional()
        )
        .max(4)
        .optional(),
    });

    return shopSchema.validate(body)
}

module.exports = {
    validateShop
}
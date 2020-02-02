
const Joi = require('@hapi/joi');

const registerValdiation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(),
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validateAsync(data);
};

const loginValdiation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).required(),
    });
    return schema.validateAsync(data);
};


module.exports.registerValdiation = registerValdiation;
module.exports.loginValdiation = loginValdiation;
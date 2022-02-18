import joi from "joi";

const newCustomerSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  birthday: joi.date().max("now").required(),
  phone: joi.string().pattern(/[0-9]{9}/),
});

export default newCustomerSchema;

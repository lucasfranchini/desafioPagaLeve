import joi from "joi";

const updateCustomerSchema = joi.object({
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string().email(),
  birthday: joi.date().max("now"),
  phone: joi.string().pattern(/[0-9]{9}/),
});

export default updateCustomerSchema;

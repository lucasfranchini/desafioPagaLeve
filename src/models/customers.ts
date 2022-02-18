import mongoose from "mongoose";

export interface CustomerInterface {
  firstName: String;
  lastName?: String;
  email: String;
  birthday: Date;
  phone: String;
}

const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    birthday: { type: Date, index: true },
    phone: { type: String, index: true },
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
      transform: (doc: any, ret: any, options: any) => {
        delete ret._id;
      },
    },
  }
);
export const Customers = mongoose.model<CustomerInterface>(
  "Customers",
  customerSchema
);

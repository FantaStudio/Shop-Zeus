const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Order = new Schema({
  productsIds: [{ type: String, ref: `Product` }],
  userId: { type: String, ref: `User` },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  execute: { type: Boolean, default: false },
});

Order.plugin(mongoosePaginate);

module.exports = model("Order", Order);

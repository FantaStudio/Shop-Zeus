const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  roles: [{ type: String, ref: `Role` }],
});

User.plugin(mongoosePaginate);

module.exports = model("User", User);
